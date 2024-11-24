package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.dto.CartItemDTO;
import com.codegym.personalprojectbe.model.Cart;
import com.codegym.personalprojectbe.model.CartItem;
import com.codegym.personalprojectbe.model.ProductDetail;
import com.codegym.personalprojectbe.repository.ICartItemRepository;
import com.codegym.personalprojectbe.repository.ICartRepository;
import com.codegym.personalprojectbe.repository.IProductDetailRepository;
import com.codegym.personalprojectbe.service.ICartItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CartItemService implements ICartItemService {
    private final ICartItemRepository cartItemRepository;
    private final ICartRepository cartRepository;
    private final IProductDetailRepository productDetailRepository;

    @Override
    public List<CartItemDTO> findByCartId(Long cartId) {
        List<CartItem> cartItems = cartItemRepository.findCartItemByCart_Id(cartId);
        return cartItems.stream()
                .map(item -> CartItemDTO.builder()
                        .id(item.getId())
                        .quantity(item.getQuantity())
                        .cartId(item.getCart().getId())
                        .productDetail(item.getProductDetail())
                        .productId(item.getProductDetail().getProduct().getId())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public CartItem addToCart(CartItemDTO cartItemDTO) {
        ProductDetail productDetail = productDetailRepository.findById(cartItemDTO.getProductDetail().getId())
                .orElseThrow(() -> new RuntimeException("Product detail not found"));
        Cart cart = cartRepository.findById(cartItemDTO.getCartId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        CartItem existingCartItem = cartItemRepository.findByCartAndProductDetail(cart, productDetail);

        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItemDTO.getQuantity());
            return cartItemRepository.save(existingCartItem);
        } else {
            CartItem cartItem = CartItem.builder()
                    .cart(cart)
                    .productDetail(productDetail)
                    .quantity(cartItemDTO.getQuantity())
                    .build();
            return cartItemRepository.save(cartItem);
        }
    }

    @Override
    public void deleteCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItemRepository.delete(cartItem);
    }

    @Override
    public CartItem updateQuantity(Long cartItemId, int quantity) {
        if (quantity < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        // Kiểm tra tồn kho trước khi cập nhật
        if (quantity > cartItem.getProductDetail().getStock()) {
            throw new IllegalArgumentException("Not enough stock to update the quantity");
        }

        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

}
