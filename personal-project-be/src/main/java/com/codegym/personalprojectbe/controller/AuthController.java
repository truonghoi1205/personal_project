package com.codegym.personalprojectbe.controller;

import com.codegym.personalprojectbe.configuration.JwtResponse;
import com.codegym.personalprojectbe.dto.AccountDTO;
import com.codegym.personalprojectbe.model.Account;
import com.codegym.personalprojectbe.model.Role;
import com.codegym.personalprojectbe.model.RoleName;
import com.codegym.personalprojectbe.model.VerificationToken;
import com.codegym.personalprojectbe.service.impl.*;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final VerificationTokenService verificationTokenService;
    private final EmailService emailService;
    private final CustomerService customerService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Account account) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(account.getEmail(), account.getPassword())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thông tin đăng nhập không chính xác!");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Account currentAccount = accountService.findByEmail(account.getEmail());


        String jwt = jwtService.generateTokenLogin(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(currentAccount.getId(), jwt, userDetails.getAuthorities()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AccountDTO accountDTO) throws MessagingException {
        if (accountService.existsByEmail(accountDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
        }
        if (!accountDTO.getPassword().equals(accountDTO.getConfirmPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu không khớp!");
        }
        Account account = new Account();
        account.setEmail(accountDTO.getEmail());
        account.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
        account.setName(accountDTO.getName());
        Set<Role> roles = new HashSet<>();
        roles.add(roleService.findByName(RoleName.ROLE_USER.toString()));
        account.setRoles(roles);
        accountService.save(account);
        customerService.createCustomerRegister(account);
        VerificationToken token = verificationTokenService.createVerificationToken(account);
        String confirmationUrl = "http://localhost:3000/activation-success?token=" + token.getToken();
        emailService.sendVerifyEmail(account.getEmail(), confirmationUrl);
        return ResponseEntity.ok("Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.");
    }

    @GetMapping("/confirm")
    public ResponseEntity<?> confirmAccount(@RequestParam("token") String token) {
        VerificationToken verificationToken = verificationTokenService.getVerificationToken(token);
        if (verificationToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token không hợp lệ!");
        }
        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            verificationTokenService.deleteToken(verificationToken);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token đã hết hạn!");
        }
        Account account = verificationToken.getAccount();
        account.setIsActive(true);
        accountService.save(account);
        verificationTokenService.deleteToken(verificationToken);

        return ResponseEntity.ok("Tài khoản đã được kích hoạt thành công!");
    }
}
