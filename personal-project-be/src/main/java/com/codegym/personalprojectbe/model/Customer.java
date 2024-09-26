package com.codegym.personalprojectbe.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Date dob;
    private String gender;
    private Boolean enable = false;
    private String phone;
    private String email;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
