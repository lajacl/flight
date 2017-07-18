package com.cooksys.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.secondassessment.dto.IncomingUserDto;
import com.cooksys.secondassessment.dto.TweetDto;
import com.cooksys.secondassessment.dto.UserDto;
import com.cooksys.secondassessment.mapper.TweetMapper;
import com.cooksys.secondassessment.mapper.UserMapper;
import com.cooksys.secondassessment.model.Credentials;
import com.cooksys.secondassessment.model.User;
import com.cooksys.secondassessment.service.UserService;

@RestController
@RequestMapping("twitter")
public class UserController {
	
	
	private UserService userService;
	private UserMapper userMapper;
	private TweetMapper tweetMapper;
	
	public UserController(UserMapper userMapper, UserService userService, TweetMapper tweetMapper) {
		this.userService = userService;
		this.userMapper = userMapper;
		this.tweetMapper = tweetMapper;
	}
	
	@GetMapping("validate/username/exists/@{username}")
	public Boolean userExists(@PathVariable String username) {
		return userService.userExists(username);
	}
	
	@GetMapping("validate/username/available/@{username}")
	public Boolean nameAvail(@PathVariable String username) {
		return userService.userAvail(username);
	}
	
	@GetMapping("users")
	public List<UserDto> getUsers() {
		return userService.findAll().stream().map(user -> userMapper.toDto(user)).collect(Collectors.toList());
	}
	
	@PostMapping("users")
	public UserDto createUser(@RequestBody IncomingUserDto userDto) {
		User userSaved = userService.create(userDto);
		return userMapper.toDto(userSaved);
	}
	
	@GetMapping ("users/@{username}")
	public UserDto getByUsername(@PathVariable String username, HttpServletRequest request) {
		System.out.println("Request URL is: " + request.getRequestURI());
		return userMapper.toDto(userService.findByUsername(username));
	}
	
	@PatchMapping ("users/@{username}")
	public UserDto updateUser(@PathVariable String username, @RequestBody IncomingUserDto userDto) {
		return userMapper.toDto(userService.update(username, userDto));
	}

	@DeleteMapping ("users/{username}")
	public UserDto deleteUser(@PathVariable String username, @RequestBody Credentials creds) {	
		return userMapper.toDto(userService.delete(username, creds));
	}
	
	@PostMapping ("users/{username}/follow")
	public void followUser(@PathVariable String username, @RequestBody Credentials creds) {
		userService.follow(username, creds);
	}

	@PostMapping ("users/{username}/unfollow")
	public void unfollowUser(@PathVariable String username, @RequestBody Credentials creds) {
		userService.unfollow(username, creds);
		
	}
	
	@GetMapping ("users/{username}/tweets")
		public List<TweetDto> getTweets(@PathVariable String username) {
		return userService.tweets(username).stream().map(tweet -> tweetMapper.toDto(tweet)).collect(Collectors.toList());
	}	
	
	@GetMapping ("users/{username}/feed")
	public List<TweetDto> getFeed(@PathVariable String username) {
		return userService.feed(username).stream().map(tweet -> tweetMapper.toDto(tweet)).collect(Collectors.toList());
	}	
	
	@GetMapping ("users/{username}/mentions")
	public List<TweetDto> getMentions(@PathVariable String username) {
		throw new NotYetImplementedException();
	}
	
	@GetMapping ("users/{username}/followers")
	public List<UserDto> getFollowers(@PathVariable String username) {
		return userService.followers(username).stream().map(user -> userMapper.toDto(user)).collect(Collectors.toList());
	}
	
	@GetMapping ("users/{username}/following")
	public List<UserDto> getFollowing(@PathVariable String username) {
		return userService.following(username).stream().map(user -> userMapper.toDto(user)).collect(Collectors.toList());
	}
}
