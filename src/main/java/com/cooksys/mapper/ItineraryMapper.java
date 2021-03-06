package com.cooksys.mapper;

import org.mapstruct.Mapper;

import com.cooksys.dto.ItineraryDto;
import com.cooksys.entity.Itinerary;

@Mapper(componentModel = "spring", uses = {FlightMapper.class})
public interface ItineraryMapper {

	ItineraryDto toDto(Itinerary entity);

	Itinerary toEntity(ItineraryDto dto);

}