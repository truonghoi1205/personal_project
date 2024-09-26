package com.codegym.personalprojectbe.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;


@Entity
@Table(name = "accounts")
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private Boolean isActive = false;
    private Boolean isDeleted = false;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;
}
