package com.cooksys.dto;

import java.util.List;

public class ItineraryDto {
	
	private long id;

	private List<FlightDto> flights;	
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public List<FlightDto> getFlights() {
		return flights;
	}
	
	public void setFlights(List<FlightDto> flights) {
		this.flights = flights;
	}

}
