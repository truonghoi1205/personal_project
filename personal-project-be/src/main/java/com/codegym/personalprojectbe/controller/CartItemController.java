package com.codegym.personalprojectbe.controller;

import com.codegym.personalprojectbe.dto.CartItemDTO;
import com.codegym.personalprojectbe.model.CartItem;
import com.codegym.personalprojectbe.service.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart-items")
@RequiredArgsConstructor
public class CartItemController {
    private final ICartItemService cartItemService;

    @GetMapping("/{cartId}")
    public ResponseEntity<List<CartItemDTO>> getAllCartItemsByCart(@PathVariable Long cartId) {
        List<CartItemDTO> cartItems = cartItemService.findByCartId(cartId);
        if (cartItems.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("")
    public ResponseEntity<CartItem> createCartItem(@RequestBody CartItemDTO cartItemDTO) {
        CartItem cartItem = cartItemService.createCartItem(cartItemDTO);
        return ResponseEntity.ok(cartItem);
    }
}
