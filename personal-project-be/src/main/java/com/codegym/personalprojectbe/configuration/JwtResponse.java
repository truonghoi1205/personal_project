package com.codegym.personalprojectbe.configuration;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
public class JwtResponse {
    private Long id;
    private String token;
    private String type = "Bearer";
    private final Collection<? extends GrantedAuthority> authorities;

    public JwtResponse(Long id, String token, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.token = token;
        this.authorities = authorities;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
