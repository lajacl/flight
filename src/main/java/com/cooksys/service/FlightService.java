package com.cooksys.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.cooksys.component.FlightGenerator;
import com.cooksys.entity.Flight;

@Service
public class FlightService {

	@Autowired
	FlightGenerator generator;

	private ArrayList<Flight> flightList = new ArrayList<>();
	
	public ArrayList<Flight> getDailyFlightList()
	{
		return flightList;
	}
	
	//The fixedDelay parameter determines how often a new day is generated as expressed in milliseconds
	@Scheduled(fixedDelay=600000)
	private void refreshFlights()
	{
		flightList = generator.generateNewFlightList();
	}

	// Algorithm to search all flights for a specific trip nonstop or with one layover
	public ArrayList<ArrayList<Flight>> searchFlights(String origin, String destination) {
		ArrayList<Flight> flights = flightList;
		ArrayList<ArrayList<Flight>> selectFlights = new ArrayList<ArrayList<Flight>>();
		
		for(int i = 0; i < flights.size(); i++) {
			
			if(flights.get(i).getOrigin().equals(origin.toUpperCase())) {
				ArrayList<Flight> tempFlights = new ArrayList<Flight>();
				
				if(flights.get(i).getDestination().equals(destination.toUpperCase())) {
					tempFlights.add(flights.get(i));
					selectFlights.add(tempFlights);				
				} else {
					String origin2 = flights.get(i).getDestination();
					
					for (int j = 0; j < flights.size(); j++) {
						ArrayList<Flight> tempFlights2 = new ArrayList<Flight>();
						
						if ((flights.get(j).getOrigin().equals(origin2.toUpperCase())) &&
							(flights.get(j).getDestination().equals(destination.toUpperCase())) &&
							(flights.get(j).getOffset() > (flights.get(i).getOffset() + flights.get(i).getFlightTime()))) {
							tempFlights2.add(flights.get(i));
							tempFlights2.add(flights.get(j));
							selectFlights.add(tempFlights2);
						}
					}
				}
			}				
		}	    	   	
		return selectFlights;
	}
	
}
