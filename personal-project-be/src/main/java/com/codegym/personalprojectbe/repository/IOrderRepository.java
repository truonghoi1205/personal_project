package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderRepository extends JpaRepository<Order, Long> {
}
