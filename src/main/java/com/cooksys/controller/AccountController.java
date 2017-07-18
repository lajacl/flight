package com.cooksys.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.entity.Account;
import com.cooksys.service.AccountService;

@RestController
@RequestMapping("flight")
public class AccountController {
	
	
	private AccountService accountService;
	
	public AccountController(AccountService accountService) {
		this.accountService = accountService;
	}
	
	@RequestMapping("account/exists/{email}")
	public Boolean accountExists(@PathVariable String email) {
		return accountService.accountExists(email);
	}
	
	@RequestMapping("account")
	public Account createUser(@RequestBody Account account) {
		Account accountSaved = accountService.create(account);
		return accountSaved;
	}
	
//	@GetMapping("validate/username/available/@{username}")
//	public Boolean nameAvail(@PathVariable String username) {
//		return accountService.userAvail(username);
//	}
//	
//	@GetMapping("users")
//	public List<UserDto> getUsers() {
//		return accountService.findAll().stream().map(user -> userMapper.toDto(user)).collect(Collectors.toList());
//	}
//	
//	
//	@GetMapping ("users/@{username}")
//	public UserDto getByUsername(@PathVariable String username, HttpServletRequest request) {
//		System.out.println("Request URL is: " + request.getRequestURI());
//		return userMapper.toDto(accountService.findByEmail(username));
//	}
//	
//	@PatchMapping ("users/@{username}")
//	public UserDto updateAccount(@PathVariable String username, @RequestBody IncomingUserDto userDto) {
//		return userMapper.toDto(accountService.update(username, userDto));
//	}
//
//	@DeleteMapping ("users/{username}")
//	public UserDto deleteUser(@PathVariable String username, @RequestBody Credentials creds) {	
//		return userMapper.toDto(accountService.delete(username, creds));
//	}
//	
//	@PostMapping ("users/{username}/book")
//	public void bookFight(@PathVariable String username, @RequestBody Credentials creds) {
//		accountService.book(email);
//	}
//	
//	@GetMapping ("flier/{username}/flights")
//	public List<UserDto> getFlights(@PathVariable String username) {
//		return userService.flights(username).stream().map(user -> userMapper.toDto(user)).collect(Collectors.toList());
//	}
}
