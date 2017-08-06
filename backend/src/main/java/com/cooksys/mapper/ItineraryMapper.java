package com.cooksys.mapper;

import org.mapstruct.Mapper;

import com.cooksys.dto.FlightDto;
import com.cooksys.dto.ItineraryDto;
import com.cooksys.entity.FlightEntity;
import com.cooksys.entity.Itinerary;

@Mapper(componentModel = "spring")
public interface ItineraryMapper {

	ItineraryDto toDto(Itinerary entity);

	Itinerary toEntity(ItineraryDto dto);
	
	FlightDto toDto(FlightEntity entity);
	
	FlightEntity toEntity(FlightDto dto);

}