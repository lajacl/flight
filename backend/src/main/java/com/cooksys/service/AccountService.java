package com.cooksys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.entity.Account;
import com.cooksys.entity.Flight;
import com.cooksys.entity.Itinerary;
import com.cooksys.repository.AccountRepository;
import com.cooksys.repository.ItineraryRepository;

@Service
public class AccountService {

	AccountRepository accountRepo;
	ItineraryRepository itineraryRepo;
	
	@Autowired
	public AccountService(AccountRepository accountRepo, ItineraryRepository itineraryRepo) {
		this.accountRepo = accountRepo;
		this.itineraryRepo = itineraryRepo;
	}

	public void save(Account account) {
		accountRepo.save(account);
	}

	public Boolean accountExists(String email) {
		Account account = accountRepo.findByEmail(email);
		if (account == null) {
			return false;
		}
		else {
			return true;
		}
	}

	public Account getOne(Long id) {
		return accountRepo.getOne(id);
	}

	public Account findByEmail(String email) {
		Account account  = accountRepo.findByEmail(email);
		return  account;
	}

	public Account createAccount(Account account) {
			Account newAccount = new Account();
			newAccount = account;
			save(newAccount);
			return newAccount;
		}
	
	public Account accountLogon(String email, String password) {
		Account acc = findByEmail(email);
		if((acc != null) && acc.getPassword().equals(password)){
			return acc;
		}
		else {
			return new Account();
		}
	}

	public Account update(Account account) {
		Account oldAccount = getOne(account.getId());
		oldAccount.setFirstName(account.getFirstName());
		oldAccount.setLastName(account.getLastName());
		oldAccount.setPhone(account.getPhone());
		save(account);
		return account;
	}

	public void bookFlight(Itinerary itinerary) {
//		Itinerary sched= new Itinerary();
//		sched = itinerary;
		itineraryRepo.save(itinerary);		
	}

	public List<Itinerary> getFlights(String email) {
		Account acc = findByEmail(email);
		return acc.getItinerary();
	}
	
	public List<Flight> getLayoverRoutes(String origin, String destination) {
		
		return null;
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
