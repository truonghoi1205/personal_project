package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.dto.CartItemDTO;
import com.codegym.personalprojectbe.model.CartItem;
import java.util.List;

public interface ICartItemService {
    List<CartItemDTO> findByCartId(Long cartId);

    CartItem createCartItem(CartItemDTO cartItemDTO);
}
