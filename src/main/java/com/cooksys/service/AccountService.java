package com.cooksys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.entity.Account;
import com.cooksys.entity.Itinerary;
import com.cooksys.repository.AccountRepository;
import com.cooksys.repository.ItineraryRepository;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepo;
	@Autowired
	private ItineraryRepository itineraryRepo;

	public Account createAccount(Account newAccount) {
		save(newAccount);
		return newAccount;
	}

	public void save(Account account) {
		accountRepo.save(account);
	}

	public Boolean accountExists(String email) {
		Account account = accountRepo.findByEmail(email);
		return account != null;
	}

	public Account accountLogin(String email, String password) {
		Account account = accountRepo.findByEmailAndPassword(email, password);
		if(account == null) {
			return new Account();
		} else {
			return account;
		}
	}

	public Account findAccountByEmail(String email) {
		Account account = accountRepo.findByEmail(email);
		return account;
	}

	public Boolean updateAccount(Account account) {
		save(account);
		return true;
	}

	public Boolean deleteAccount(Long id) {
		accountRepo.delete(id);
		return true;
	}

	public Boolean bookFlight(Long id, Itinerary itinerary) {
		Account account = getOne(id);
		itinerary.setAccount(account);
		itineraryRepo.save(itinerary);
		return true;
	}

	public Account getOne(Long id) {
		return accountRepo.getOne(id);
	}

	public List<Itinerary> getFlights(Long id) {
		Account account = getOne(id);
		return account.getItinerary();
	}
}
