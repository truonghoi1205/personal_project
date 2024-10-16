package com.codegym.personalprojectbe.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {
    private String sku;
    private String name;
    private String description;
    private String concentration;
    private String season;
    private Long categoryId;
    private Long brandId;
    private List<String> images;
    private List<ProductDetailDTO> productDetails;
}
