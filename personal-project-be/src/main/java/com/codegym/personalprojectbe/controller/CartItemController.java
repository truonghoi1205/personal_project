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

    // Lấy tất cả các item trong giỏ hàng
    @GetMapping("/{cartId}")
    public ResponseEntity<List<CartItemDTO>> getAllCartItemsByCart(@PathVariable Long cartId) {
        List<CartItemDTO> cartItems = cartItemService.findByCartId(cartId);
        if (cartItems.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cartItems);
    }

    // Thêm sản phẩm vào giỏ hàng
    @PostMapping("")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItemDTO cartItemDTO) {
        try {
            CartItem cartItem = cartItemService.addToCart(cartItemDTO);
            return ResponseEntity.ok(cartItem);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Nếu dữ liệu không hợp lệ
        }
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateQuantity(@PathVariable Long cartItemId, @RequestBody CartItemDTO cartItemDTO) {
        try {
            CartItem cartItem = cartItemService.updateQuantity(cartItemId, cartItemDTO.getQuantity());
            return ResponseEntity.ok(cartItem);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Nếu số lượng không hợp lệ
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null); // Xử lý lỗi không mong muốn
        }
    }

//     Xóa item khỏi giỏ hàng
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cartItemId) {
        cartItemService.deleteCartItem(cartItemId);
        return ResponseEntity.noContent().build();
    }
}
