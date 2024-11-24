package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Cart;
import com.codegym.personalprojectbe.model.CartItem;
import com.codegym.personalprojectbe.model.Product;
import com.codegym.personalprojectbe.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICartItemRepository extends JpaRepository<CartItem,Long> {
    List<CartItem> findCartItemByCart_Id(Long cartId);

    CartItem findByCartAndProductDetail(Cart cart, ProductDetail productDetail);

}
