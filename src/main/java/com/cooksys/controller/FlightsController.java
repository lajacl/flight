package com.cooksys.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.FlightDto;
import com.cooksys.mapper.FlightMapper;
import com.cooksys.service.FlightService;

@RestController
@RequestMapping("flight")
@CrossOrigin
public class FlightsController {
	
	@Autowired
	FlightService flightService;	
	@Autowired
	FlightMapper flightMapper;
	
	
	@GetMapping("flights")
	public List<FlightDto> getFlightList()
	{
		return flightService.getDailyFlightList().stream().map(flight -> flightMapper.toDto(flight)).collect(Collectors.toList());
	}
	
	@GetMapping("flights/search")
	public List<List<FlightDto>> searchFlights(@RequestParam String origin, String destination) 	
	{
		return flightService.searchFlights(origin, destination).stream().map(flights -> flights.stream().map(flight -> flightMapper.toDto(flight)).collect(Collectors.toList())).collect(Collectors.toList());
	}

}
