package com.cooksys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.AccountDto;
import com.cooksys.mapper.AccountMapper;
import com.cooksys.service.AccountService;

@RestController
@RequestMapping("flight")
@CrossOrigin
public class AccountController {
	

	AccountService accountService;
	
	AccountMapper accountMapper;
	
	@Autowired
	public AccountController(AccountService accountService, AccountMapper accountMapper) {
		this.accountService = accountService;
		this.accountMapper = accountMapper;
	}
	
//	public AccountController(){}
	
	
	@RequestMapping(value = "account/exists/{email:.+}", method = RequestMethod.GET)
	public Boolean exists(@PathVariable String email) {
		return accountService.accountExists(email);
	}
	
	@RequestMapping(value = "/account", method = RequestMethod.POST)
	public void create(@RequestBody AccountDto accountDto) {
//		return accountMapper.toDto(accountService.createAccount(accountDto));
		System.out.println("DTO INFO: " + accountMapper.toDto(accountService.createAccount(accountDto)).getEmail());
	}
	
//	@RequestMapping("account")
//	public AccountDto post(@RequestParam("email, password, firstName, lastName, phone") String email, String password, String firstName, String lastName, String phone)
//	{	return accountMapper.toDto(accountService.create(email, password, lastName, firstName, phone));
//	}
	
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
