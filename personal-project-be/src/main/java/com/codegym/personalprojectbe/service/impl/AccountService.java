package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.configuration.UserPrinciple;
import com.codegym.personalprojectbe.dto.NewPasswordDTO;
import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.VerificationToken;
import com.codegym.personalprojectbe.repository.IAccountRepository;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AccountService implements UserDetailsService {

    private final IAccountRepository accountRepository;
    private final VerificationTokenService verificationTokenService;
    private final EmailService emailService;

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

    public ResponseEntity<?> forgetPassword(VerificationTokenService verificationTokenService,
                                            String token,
                                            NewPasswordDTO newPasswordDTO,
                                            PasswordEncoder passwordEncoder) {
        VerificationToken verificationToken = verificationTokenService.getVerificationToken(token);
        if (verificationToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token không hợp lệ!");
        }

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            verificationTokenService.deleteToken(verificationToken);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token đã hết hạn! Vui lòng yêu cầu gửi lại email xác minh.");
        }

        if (!newPasswordDTO.getNewPassword().equals(newPasswordDTO.getReEnterPassword())) {
            return new ResponseEntity<>("Nhập lại mật khẩu không đúng", HttpStatus.BAD_REQUEST);
        }
        Account account = verificationToken.getAccount();
        String pw = passwordEncoder.encode(newPasswordDTO.getNewPassword());
        account.setPassword(pw);
        save(account);

        verificationTokenService.deleteToken(verificationToken);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> confirmEmail(String token, VerificationTokenService verificationTokenService) {
        VerificationToken verificationToken = verificationTokenService.getVerificationToken(token);

        if (verificationToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token không hợp lệ!");
        }

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            verificationTokenService.deleteToken(verificationToken);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token đã hết hạn! Vui lòng yêu cầu gửi lại email xác minh.");
        }


        return ResponseEntity.ok("Chuyển đến trang cập nhật mật khẩu!");
    }
}
