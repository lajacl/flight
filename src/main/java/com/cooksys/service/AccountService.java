package com.cooksys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.dto.AccountDto;
import com.cooksys.entity.Account;
import com.cooksys.entity.FlightEntity;
import com.cooksys.repository.AccountRepository;

@Service
public class AccountService {

	AccountRepository accountRepo;
	
	@Autowired
	public AccountService(AccountRepository accountRepo) {
		this.accountRepo = accountRepo;
	}
	

	public Boolean accountExists(String email) {
		Account account = accountRepo.findByEmail(email);
		if (account != null) {
				return true;
		}
		else {
			return false;
		}
	}

	public Account getOne(Long id) {
		return accountRepo.getOne(id);
	}

	public Account findByEmail(String email) {
		Account account  = accountRepo.findByEmail(email);
		return  account;
	}

	public void save(Account account) {
		accountRepo.save(account);
	}

//	String email, String password, String firstName, String lastName, String phone
	public Account createAccount(AccountDto accountDto) {
			Account newAccount = new Account();
//			newAccount = accountDto;
			newAccount.setEmail(accountDto.getEmail());
			newAccount.setPassword(accountDto.getPassword());
			newAccount.setFirstName(accountDto.getFirstName());
			newAccount.setLastName(accountDto.getLastName());
			newAccount.setPhone(accountDto.getPhone());
			save(newAccount);
//			System.out.println("Create Account Info Phone: " + accountDto.getPhone());
			return newAccount;
		}
	
	public Account accountLogon(String email, String password) {
		if(password == findByEmail(email).getPassword());
		return findByEmail(email);
	}

	public Account update(Account account) {
		Account oldAccount = getOne(account.getId());
		oldAccount.setFirstName(account.getFirstName());
		oldAccount.setLastName(account.getLastName());
		oldAccount.setPhone(account.getPhone());
		save(account);
		return account;
	}

	public void book(long id, FlightEntity flight) {
		Account account = getOne(id);
		account.getFlights().add(flight);
		save(account);
		
	}

	public List<FlightEntity> flights(long id) {
		Account account = getOne(id);
		return account.getFlights();
	}


//	public User delete(String username, Credentials creds) {
//		User user = checkCreds(username, creds);
//		user.setActive(false);
//		save(user);
//		return user;
//		
//	public void unfollow(String username, Credentials creds) {
//		User follower = checkCreds(creds.getUsername(), creds);
//		User user = findByUsername(username);
//		follower.getFollowing().remove(user);	
//		save(follower);
//	}
//
//	public List<User> followers(String username) {
//		List<User> followers = new ArrayList<User>();
//		List<User> users = findAll();
//		for (User user : users) {
//			if (user.getFollowing().contains(findByUsername(username))) {
//				followers.add(user);
//				System.out.println("Followers: " + followers.toString());				
//			}
//		}
//		return followers;
//	}	
//	
//	// Checks for valid Credentials
//	public User checkCreds(String username, Credentials creds) {
//		User user = findByUsername(username);
//		if (user.getCredentials().equals(creds)) {
//			return user;
//		}
//		else throw new InvalidAPICallException(username);
//		
//	}
//
//	public String removeSymbol(String atUser) {
//		System.out.println("@ Username: " + atUser);
//
//		if (atUser.startsWith("@")) {
//			return atUser.substring(1);
//		}
//		else throw new InvalidAPICallException(atUser);
//	}
//
//	public List<Tweet> tweets(String username) {
//		User user = findByUsername(username);
//		return user.getTweets();
//	}
//
//	public List<Tweet> feed(String username) {
//		User user = findByUsername(username);
//		List<Tweet> feedTweets = user.getTweets();
//		for (User followUser: following(username)) {
//			feedTweets.addAll(followUser.getTweets());
//		}
//		return feedTweets;
//	}

}
