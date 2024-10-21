package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICartRepository extends JpaRepository<Cart, Long> {
    Cart findCartByCustomer_Id(Long customerId);
}
