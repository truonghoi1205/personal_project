package com.codegym.personalprojectbe.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private Long id;
    private int quantity;
    private Double price;
    private Long productId;
}