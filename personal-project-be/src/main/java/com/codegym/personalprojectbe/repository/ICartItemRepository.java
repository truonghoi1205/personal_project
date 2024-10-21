package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICartItemRepository extends JpaRepository<CartItem,Long> {
    List<CartItem> findCartItemByCart_Id(Long cartId);
}
