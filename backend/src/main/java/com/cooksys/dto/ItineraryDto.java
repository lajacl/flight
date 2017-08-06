package com.cooksys.dto;

import java.util.List;

import com.cooksys.entity.Account;

public class ItineraryDto {
	
	private long id;

	private Account account;

	private List<FlightDto> flights;	
	
	
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
	
	public List<FlightDto> getFlights() {
		return flights;
	}
	
	public void setFlights(List<FlightDto> flights) {
		this.flights = flights;
	}

}
