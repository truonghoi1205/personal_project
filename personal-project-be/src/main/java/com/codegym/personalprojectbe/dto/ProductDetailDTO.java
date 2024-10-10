package com.codegym.personalprojectbe.dto;

import com.codegym.personalprojectbe.model.Product;
import lombok.Data;

@Data
public class ProductDetailDTO {
    private int volume;
    private int stock;
    private double price;

    private Product product;
}
