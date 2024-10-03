package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.VerificationToken;
import com.codegym.personalprojectbe.repository.IVerificationTokenRepository;
import com.codegym.personalprojectbe.service.IVerificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationTokenService implements IVerificationTokenService {
    @Autowired
    private IVerificationTokenRepository tokenRepository;

    public VerificationToken createVerificationToken(Account account) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(10);
        VerificationToken verificationToken = new VerificationToken(token, account, expiryDate);
        tokenRepository.save(verificationToken);
        return verificationToken;
    }

    public VerificationToken getVerificationToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public void deleteToken(VerificationToken token) {
        tokenRepository.delete(token);
    }

    @Override
    public VerificationToken getVerificationTokenByAccount(Account currentAccount) {
        return tokenRepository.getVerificationTokenByAccount(currentAccount);
    }

    @Override
    public void save(VerificationToken verificationToken) {
        tokenRepository.save(verificationToken);
    }
}
