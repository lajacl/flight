package com.cooksys.mapper;

import org.mapstruct.Mapper;

import com.cooksys.dto.AccountDto;
import com.cooksys.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountMapper {

		AccountDto toDto(Account entity);

		Account toEntity(AccountDto dto);

}