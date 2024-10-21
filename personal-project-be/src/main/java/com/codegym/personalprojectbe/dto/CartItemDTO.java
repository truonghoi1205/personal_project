package com.codegym.personalprojectbe.dto;

import com.codegym.personalprojectbe.model.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemDTO {
    private Long id;
    private int quantity;
    private Long productId;
    private ProductDetail productDetail;
    private Long cartId;
}
