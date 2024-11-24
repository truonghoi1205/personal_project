package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.model.Cart;
import com.codegym.personalprojectbe.model.Customer;


public interface ICartService {

    Cart createCart(Customer customer);


    Cart findCartByCustomerId(Long customerId);
}
