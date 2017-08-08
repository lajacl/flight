package com.cooksys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.Account;
import com.cooksys.entity.Flight;

public interface FlightRepository extends JpaRepository<Account, Long> {

	Flight findByOrigin(String origin);
	
	Flight findByDestination(String destination);

}
