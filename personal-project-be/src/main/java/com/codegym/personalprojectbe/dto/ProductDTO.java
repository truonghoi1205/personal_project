package com.codegym.personalprojectbe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
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
