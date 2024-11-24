package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPaymentRepository extends JpaRepository<Payment,Long> {
}
