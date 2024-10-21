package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.dto.CartItemDTO;
import com.codegym.personalprojectbe.model.Cart;
import com.codegym.personalprojectbe.model.CartItem;
import com.codegym.personalprojectbe.model.ProductDetail;
import com.codegym.personalprojectbe.repository.ICartItemRepository;
import com.codegym.personalprojectbe.repository.ICartRepository;
import com.codegym.personalprojectbe.repository.IProductRepository;
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
    private final IProductRepository productRepository;

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
    public CartItem createCartItem(CartItemDTO cartItemDTO) {
        Cart cart = cartRepository.findById(cartItemDTO.getCartId()).orElse(null);

        CartItem cartItem = CartItem.builder()
                .cart(cart)
//                .product(product)
                .quantity(cartItemDTO.getQuantity())
                .build();
        return cartItemRepository.save(cartItem);
    }

}
