package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAccountRepository extends JpaRepository<Account,Long> {
    Account findByEmail(String email);

    boolean existsByEmail(String email);
}
