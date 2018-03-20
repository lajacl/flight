package com.cooksys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

	Account findByEmail(String email);

	Account findByEmailAndPassword(String email, String password);

}