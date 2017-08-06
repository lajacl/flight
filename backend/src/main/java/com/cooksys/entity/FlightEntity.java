package com.cooksys.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Flight")
public class FlightEntity {
	
	@Id
	@GeneratedValue
	private long id;
	
	//Name of city where flight originates
	@Column(name = "origin")
	private String origin;
	
	//Name of city where flight lands
	@Column(name = "destination")
	private String destination;
	
	//How many hours flight is in the air
	@Column(name = "flightTime")
	private long flightTime;
	
	//How many hours after the start of the day until the flight takes off
	@Column(name = "offsetTime")
	private long offset;

	@ManyToMany(mappedBy = "flights")
	private List<Itinerary> itineraries;
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getOrigin() {
		return origin;
	}
	
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	
	
	public String getDestination() {
		return destination;
	}
	
	public void setDestination(String destination) {
		this.destination = destination;
	}
	
	public long getFlightTime() {
		return flightTime;
	}
	
	public void setFlightTime(long flightTime) {
		this.flightTime = flightTime;
	}
	
	public long getOffset() {
		return offset;
	}
	
	public void setOffset(long offset) {
		this.offset = offset;
	}
	
	public List<Itinerary> getItinerary() {
		return itineraries;
	}
	
	public void seItinerary(List<Itinerary> itineraries) {
		this.itineraries = itineraries;
	}


}
