package com.cooksys.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.FlightDto;
import com.cooksys.mapper.FlightMapper;
import com.cooksys.service.FlightService;
import com.cooksys.service.LocationService;

@RestController
@RequestMapping("flights")
@CrossOrigin
public class FlightsController {
	
	@Autowired
	LocationService locationService;
	
	@Autowired
	FlightService flightService;
	
	@Autowired
	FlightMapper flightMapper;
	
//	public FlightsController(FlightMapper flightMapper) {
//		this.flightMapper = flightMapper;
//	}
	
	@RequestMapping
	public List<FlightDto> getFlightList()
	{
		return flightService.getDailyFlightList().stream().map(flight -> flightMapper.toDto(flight)).collect(Collectors.toList());
	}

}
