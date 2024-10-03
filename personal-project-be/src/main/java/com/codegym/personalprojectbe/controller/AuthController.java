package com.codegym.personalprojectbe.controller;

import com.codegym.personalprojectbe.configuration.JwtResponse;
import com.codegym.personalprojectbe.configuration.UserPrinciple;
import com.codegym.personalprojectbe.dto.AccountDTO;
import com.codegym.personalprojectbe.dto.NewPasswordDTO;
import com.codegym.personalprojectbe.dto.UserDTO;
import com.codegym.personalprojectbe.model.*;
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
import java.util.Map;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tài khoản hoặc mật khẩu không đúng!");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Account currentAccount = accountService.findByEmail(account.getEmail());

        if (!currentAccount.getIsActive()) {
            VerificationToken token = verificationTokenService.getVerificationTokenByAccount(currentAccount);
            if (token == null || token.getExpiryDate().isBefore(LocalDateTime.now().minusMinutes(5))) {
                VerificationToken newToken = verificationTokenService.createVerificationToken(currentAccount);
                String confirmationUrl = "http://localhost:3000/verify-account?token=" + newToken.getToken();
                try {
                    emailService.sendVerifyEmail(currentAccount.getEmail(), confirmationUrl);
                } catch (MessagingException e) {
                    throw new RuntimeException(e);
                }

                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Tài khoản chưa được kích hoạt! Email xác nhận đã được gửi lại. Vui lòng kiểm tra email.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Tài khoản chưa được kích hoạt! Vui lòng kiểm tra email để kích hoạt tài khoản.");
            }
        }

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
        String confirmationUrl = "http://localhost:3000/verify-account?token=" + token.getToken();

        // Gửi email xác minh
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


    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        Account account = accountService.findByEmail(userPrinciple.getUsername());

        // Kiểm tra tài khoản có tồn tại không
        if (account == null) {
            return ResponseEntity.notFound().build(); // Trả về mã 404 nếu không tìm thấy tài khoản
        }

        UserDTO userDTO = new UserDTO();
        Customer customer = customerService.findByAccountId(account.getId());
        // Kiểm tra vai trò của tài khoản
        boolean isUser = account.getRoles().stream()
                .anyMatch(role -> role.getName().equals(RoleName.ROLE_USER.toString()));
        boolean isAdmin = account.getRoles().stream()
                .anyMatch(role -> role.getName().equals(RoleName.ROLE_ADMIN.toString()));
        // Nếu tài khoản có vai trò ROLE_USER, lấy thông tin người dùng
        if (isAdmin) {
            userDTO.setId(account.getId());
            userDTO.setName(account.getName());
            userDTO.setEmail(account.getEmail());
            userDTO.setRoles(account.getRoles());
        }
        if (isUser) {
            // Lưu thông tin người dùng vào UserDTO
            userDTO.setId(account.getId());
            userDTO.setName(account.getName());
            userDTO.setEmail(account.getEmail());
            userDTO.setRoles(account.getRoles());
            userDTO.setPhone(customer.getPhone());
            userDTO.setGender(customer.getGender());
            userDTO.setDob(customer.getDob());
        }

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/confirmEmail")
    public ResponseEntity<?> confirmEmail(@RequestParam("token") String token) {
        return accountService.confirmEmail(token, verificationTokenService);
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<?> forgetPassword(@RequestParam("token") String token,
                                                  @RequestBody NewPasswordDTO newPasswordDTO) {
        return accountService.forgetPassword(verificationTokenService, token, newPasswordDTO, passwordEncoder);
    }
}
