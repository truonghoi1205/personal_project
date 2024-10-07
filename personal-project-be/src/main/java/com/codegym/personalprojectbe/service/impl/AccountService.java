package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.configuration.UserPrinciple;
import com.codegym.personalprojectbe.dto.PasswordDTO;
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

@Service
@AllArgsConstructor
public class AccountService implements UserDetailsService {

    private final IAccountRepository accountRepository;
    private final VerificationTokenService verificationTokenService;
    private final EmailToRetrievePasswordService emailToRetrievePasswordService;

    // Nạp thông tin người dùng dựa trên email
    public UserDetails loadUserByUsername(String email) {
        return UserPrinciple.build(accountRepository.findByEmail(email));
    }

    // Tìm tài khoản theo email
    public Account findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    // Kiểm tra xem email có tồn tại trong hệ thống hay không
    public boolean existsByEmail(String email) {
        return accountRepository.existsByEmail(email);
    }

    // Lưu tài khoản
    public void save(Account account) {
        accountRepository.save(account);
    }

    // Xác nhận email để lấy lại mật khẩu
    public ResponseEntity<?> forgotPassword(String email) throws MessagingException {
        Account account = findByEmail(email);

        // Kiểm tra tài khoản tồn tại
        if (account == null) {
            return ResponseEntity.badRequest().body("Email không tồn tại trong hệ thống!");
        }

        // Kiểm tra nếu đã tồn tại token cho tài khoản này
        VerificationToken existingToken = verificationTokenService.findByAccount(account);
        if (existingToken != null) {
            // Xóa token cũ nếu tồn tại
            verificationTokenService.deleteToken(existingToken);
        }

        // Tạo token mới sau khi đã xóa token cũ (nếu có)
        VerificationToken newToken = verificationTokenService.createVerificationToken(account);

        // Gửi email khôi phục mật khẩu với token
        String confirmationUrl = "http://localhost:3000/reset-password?token=" + newToken.getToken();
        emailToRetrievePasswordService.sendVerifyEmail(account.getEmail(), confirmationUrl);

        return ResponseEntity.ok("Vui lòng kiểm tra email để khôi phục mật khẩu của bạn.");
    }

    // Cập nhật mật khẩu mới
    public ResponseEntity<?> resetPassword(String token, PasswordDTO passwordDTO, PasswordEncoder passwordEncoder) {
        VerificationToken verificationToken = verificationTokenService.getVerificationToken(token);
        if (verificationToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token không hợp lệ!");
        }

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            verificationTokenService.deleteToken(verificationToken);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token đã hết hạn! Vui lòng yêu cầu gửi lại email xác minh.");
        }

        if (!passwordDTO.getNewPassword().equals(passwordDTO.getReEnterPassword())) {
            return new ResponseEntity<>("Nhập lại mật khẩu không đúng", HttpStatus.BAD_REQUEST);
        }
        Account account = verificationToken.getAccount();
        String pw = passwordEncoder.encode(passwordDTO.getNewPassword());
        account.setPassword(pw);
        save(account);

        verificationTokenService.deleteToken(verificationToken);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
