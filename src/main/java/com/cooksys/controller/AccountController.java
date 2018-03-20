package com.cooksys.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.AccountDto;
import com.cooksys.dto.ItineraryDto;
import com.cooksys.mapper.AccountMapper;
import com.cooksys.mapper.ItineraryMapper;
import com.cooksys.service.AccountService;

@RestController
@RequestMapping("flight")
@CrossOrigin
public class AccountController {

	@Autowired
	AccountService accountService;	
	@Autowired
	AccountMapper accountMapper;	
	@Autowired
	ItineraryMapper itineraryMapper;
	

	@GetMapping("account/exists")
	public Boolean exists(@RequestParam String email) {
		return accountService.accountExists(email);
	}

	@PostMapping("account/register")
	public AccountDto register(@RequestBody AccountDto accountDto) {
		return accountMapper.toDto(accountService.createAccount(accountMapper.toEntity(accountDto)));
	}

	@PostMapping("account/login")
	public AccountDto login(@RequestParam String email, String password) {
		return accountMapper.toDto(accountService.accountLogin(email, password));
	}

	@PostMapping("account/book")
	public Boolean book(@RequestParam Long id, @RequestBody ItineraryDto itineraryDto) {
		return accountService.bookFlight(id, itineraryMapper.toEntity(itineraryDto));
	}

	@GetMapping("account/flights")
	public List<ItineraryDto> flights(@RequestParam Long id) {
		return accountService.getFlights(id).stream().map(schedule -> itineraryMapper.toDto(schedule))
				.collect(Collectors.toList());
	}

	@PatchMapping("account/update")
	public Boolean update(@RequestBody AccountDto accountDto) {
		return accountService.updateAccount(accountMapper.toEntity(accountDto));
	}

	@DeleteMapping("account/delete")
	public Boolean delete(@RequestParam Long id) {
		return accountService.deleteAccount(id);
	}
}
