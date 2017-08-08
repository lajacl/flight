package com.cooksys.mapper;

import org.mapstruct.Mapper;

import com.cooksys.dto.FlightDto;
import com.cooksys.entity.Flight;

@Mapper(componentModel = "spring")
public interface FlightMapper {

	FlightDto toDto(Flight entity);
	
	Flight toEntity(FlightDto dto);

}