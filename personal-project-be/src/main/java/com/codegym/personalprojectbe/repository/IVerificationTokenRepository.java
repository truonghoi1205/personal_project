package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface IVerificationTokenRepository extends JpaRepository<VerificationToken,Long> {
    VerificationToken findByToken(String token);

    List<VerificationToken> findAllByExpiryDateBefore(LocalDateTime now);

    VerificationToken getVerificationTokenByAccount(Account currentAccount);
}
