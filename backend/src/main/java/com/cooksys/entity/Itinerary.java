package com.cooksys.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Itinerary")
public class Itinerary {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne
	private Account account;

	@ManyToMany
	private List<FlightEntity> flights;
	
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Account getAccount() {
		return account;
	}
	
	public void setAccount(Account account) {
		this.account = account;
	}
	
	public List<FlightEntity> getFlights() {
		return flights;
	}
	
	public void setFlights(List<FlightEntity> flights) {
		this.flights = flights;
	}


}
