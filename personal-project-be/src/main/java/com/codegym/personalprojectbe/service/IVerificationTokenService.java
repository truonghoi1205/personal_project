package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.VerificationToken;

public interface IVerificationTokenService {
    VerificationToken createVerificationToken(Account account);
    VerificationToken getVerificationToken(String token);
    void deleteToken(VerificationToken token);

    VerificationToken getVerificationTokenByAccount(Account currentAccount);

    void save(VerificationToken verificationToken);

    VerificationToken findByAccount(Account account);
}
