package com.cooksys.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.AccountDto;
import com.cooksys.dto.ItineraryDto;
import com.cooksys.entity.FlightEntity;
import com.cooksys.mapper.AccountMapper;
import com.cooksys.mapper.ItineraryMapper;
import com.cooksys.service.AccountService;

@RestController
@RequestMapping("flight")
@CrossOrigin
public class AccountController {
	

	AccountService accountService;	
	AccountMapper accountMapper;
	ItineraryMapper itineraryMapper;
	
	
	@Autowired
	public AccountController(AccountService accountService, AccountMapper accountMapper, ItineraryMapper itineraryMapper) {
		this.accountService = accountService;
		this.accountMapper = accountMapper;
		this.itineraryMapper = itineraryMapper;
	}
	
	
	@GetMapping("account/exists")
	public Boolean exists(@RequestParam String email) {
		return accountService.accountExists(email);
	}
	
	@PostMapping("/account")
	public AccountDto create(@RequestBody AccountDto accountDto) {
		return accountMapper.toDto(accountService.createAccount(accountMapper.toEntity(accountDto)));
	}
		
	@PostMapping("/account/login")
	public AccountDto logon(@RequestParam String email, String password) {
		return accountMapper.toDto(accountService.accountLogon(email, password));
	}
	
	@PostMapping ("account/book")
	public void book(@RequestParam String email, List<FlightEntity> flights) {
		accountService.bookFlight(email, flights);
	}
	
	@GetMapping ("account/flights")
	public List<ItineraryDto> flights(@RequestParam String email) {
		return accountService.getFlights(email).stream().map(sched -> itineraryMapper.toDto(sched)).collect(Collectors.toList());
	}

//	@PatchMapping ("account}")
//	public AccountDto updateAccount(@RequestParam Long id, @RequestBody AccountDto accDto) {
//		return accountMapper.toDto(accountService.update(id, accDto));
//	}
//
//	@DeleteMapping ("account")
//	public AccountDto deleteUser(@RequestParam Long id) {	
//		return accountMapper.toDto(accountService.delete(id));
//	}
}
