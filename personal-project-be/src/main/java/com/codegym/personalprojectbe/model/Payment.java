package com.codegym.personalprojectbe.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private Date paymentDate;
    private Double amount;
    private String paymentMethod;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
}
