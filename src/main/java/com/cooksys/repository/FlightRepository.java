package com.cooksys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.Flight;

public interface FlightRepository extends JpaRepository<Flight, Long> {

	Flight findByOrigin(String origin);
	
	Flight findByDestination(String destination);
	
	List<Flight> findByOriginAndDestinationAllIgnoreCaseAndCurrentTrueOrderByOffsetAsc(String origin, String destination);
	
	List<Flight> findByOriginAndDestinationNotAllIgnoreCaseAndCurrentTrueOrderByOffsetAsc(String origin, String destination);

	List<Flight> findByOriginAndDestinationAllIgnoreCaseAndOffsetGreaterThanAndCurrentTrueOrderByOffsetAsc(String origin, String destination, long offset);

}
