package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.model.Cart;
import com.codegym.personalprojectbe.model.Customer;
import com.codegym.personalprojectbe.repository.ICartRepository;
import com.codegym.personalprojectbe.service.ICartService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class CartService implements ICartService {
    private final ICartRepository cartRepository;

    @Override
    public Cart createCart(Customer customer) {
        Cart cart = new Cart();
        cart.setCustomer(customer);
        return cartRepository.save(cart);
    }

    @Override
    public Cart findByCustomerId(Long customerId) {
        return cartRepository.findCartByCustomer_Id(customerId);
    }
}
