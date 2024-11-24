package com.codegym.personalprojectbe.controller;

import com.codegym.personalprojectbe.model.Cart;
import com.codegym.personalprojectbe.service.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/carts")
@RequiredArgsConstructor
public class CartController {
    private final ICartService cartService;

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Cart> getCartByCustomerId(@PathVariable Long customerId) {
        Cart cart = cartService.findCartByCustomerId(customerId);
        if (cart != null) {
            return ResponseEntity.ok(cart);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
