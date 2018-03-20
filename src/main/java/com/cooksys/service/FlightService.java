package com.cooksys.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.cooksys.component.FlightGenerator;
import com.cooksys.entity.Flight;
import com.cooksys.repository.FlightRepository;

@Service
public class FlightService {

	@Autowired
	FlightGenerator generator;
	
	@Autowired
	FlightRepository flightRepo;

	private ArrayList<Flight> flightList = new ArrayList<>();

	private ArrayList<ArrayList<Flight>> foundFlights;
	
		
	public ArrayList<Flight> getDailyFlightList()
	{
		return flightList;
	}
	
	//The fixedDelay parameter determines how often a new day is generated as expressed in milliseconds
	@Scheduled(fixedDelay=300000)

	private void refreshFlights()
	{
		ArrayList<Flight> oldFlights = flightList;
		setCurrentfalse(oldFlights);
		flightList = generator.generateNewFlightList();
	}

	private void setCurrentfalse(ArrayList<Flight> oldFlights) {
		for(Flight oldFlight: oldFlights) {
			oldFlight.setCurrent(false);
			flightRepo.save(oldFlight);
		}
		
	}

	// Search all current flights for a specific trip nonstop or with one layover
	public ArrayList<ArrayList<Flight>> searchFlights(String origin, String destination) {
		foundFlights = new ArrayList<ArrayList<Flight>>();
		String tripOrigin = origin;
		String tripDestination = destination;
		
		findDirectFlights(tripOrigin, tripDestination);
		
		findLayoverFlights(tripOrigin, tripDestination);
			    	   	
		return foundFlights;
	}

	private void findDirectFlights(String tripOrigin, String tripDestination) {		
		List<Flight> directFlights = flightRepo.
				findByOriginAndDestinationAllIgnoreCaseAndCurrentTrueOrderByOffsetAsc(tripOrigin, tripDestination);
		
		for(Flight flight : directFlights) {
			ArrayList<Flight> flightHolder = new ArrayList<Flight>();
			flightHolder.add(flight);
			foundFlights.add(flightHolder);
		}
	}

	private void findLayoverFlights(String tripOrigin, String tripDestination) {
		List<Flight> flightsWithTripOrigin = flightRepo.
				findByOriginAndDestinationNotAllIgnoreCaseAndCurrentTrueOrderByOffsetAsc(tripOrigin, tripDestination);
		
		for(Flight flight : flightsWithTripOrigin) {
			Long minimumLayover = (long) 1;
			String nextFlightOrigin = flight.getDestination();
			Long nextFlightOffsetMinimum = flight.getOffset() + flight.getFlightTime() + minimumLayover;

			List<Flight> nextFlights = flightRepo.
					findByOriginAndDestinationAllIgnoreCaseAndOffsetGreaterThanAndCurrentTrueOrderByOffsetAsc(nextFlightOrigin, tripDestination, nextFlightOffsetMinimum);

			for(Flight nextFlight : nextFlights) {
				ArrayList<Flight> flightHolder = new ArrayList<Flight>();
				flightHolder.add(flight);
				flightHolder.add(nextFlight);
				foundFlights.add(flightHolder);		
			}
		}
	}
	
}