package com.cooksys.dto;

import java.util.List;

public class ItineraryDto {
	
	private long id;

	private AccountDto account;

	private List<FlightDto> flights;	
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public AccountDto getAccount() {
		return account;
	}
	
	public void setAccount(AccountDto account) {
		this.account = account;
	}
	
	public List<FlightDto> getFlights() {
		return flights;
	}
	
	public void setFlights(List<FlightDto> flights) {
		this.flights = flights;
	}

}
