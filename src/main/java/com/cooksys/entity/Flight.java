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
public class Flight {

	@Id
	@GeneratedValue
	private long id;

	@Column(name = "origin")
	private String origin;

	@Column(name = "destination")
	private String destination;

	@Column(name = "flightTime")
	private long flightTime;

	@Column(name = "offsetTime")
	private long offset;

	@ManyToMany(mappedBy = "flights")
	private List<Itinerary> itineraries;
	
	@Column(name = "current")
	private Boolean current;
	
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
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
	
	public List<Itinerary> getItineraries() {
		return itineraries;
	}
	
	public void setItineraries(List<Itinerary> itineraries) {
		this.itineraries = itineraries;
	}
	
	public Boolean getCurrent() {
		return current;
	}

	public void setCurrent(Boolean current) {
		this.current = current;
	}

	@Override
	public String toString() {
		return "Flight " + id + ": " + origin + " to " + destination + " Depart: " + offset
				+ " Arrive: " + (offset+flightTime);
	}

}
