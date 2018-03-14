package com.cooksys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.entity.Location;
import com.cooksys.service.LocationService;

@RestController
@RequestMapping("flight")
@CrossOrigin
public class LocationController {
	
	@Autowired
	private LocationService locationService;

	@GetMapping("locations")
	public List<Location> get() {
		return locationService.getAll();
	}

	@GetMapping("locations/{id}")
	public Location get(@PathVariable Long id) {
		return locationService.get(id);
	}
	
	@GetMapping("locations/name")
	public Location get(@RequestParam("name") String cityName)
	{
		return locationService.get(cityName);
	}

}
