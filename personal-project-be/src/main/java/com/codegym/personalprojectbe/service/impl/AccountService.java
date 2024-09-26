package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.configuration.UserPrinciple;
import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.repository.IAccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountService implements UserDetailsService {

    private final IAccountRepository accountRepository;

    public UserDetails loadUserByUsername(String email) {
        return UserPrinciple.build(accountRepository.findByEmail(email));
    }

    public Account findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return accountRepository.existsByEmail(email);
    }

    public void save(Account account) {
        accountRepository.save(account);
    }
}
