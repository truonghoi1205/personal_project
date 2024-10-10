package com.codegym.personalprojectbe.dto;

import com.codegym.personalprojectbe.model.Brand;
import com.codegym.personalprojectbe.model.Category;
import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {
    private String sku;
    private String name;
    private String description;
    private String concentration;
    private String season;
    private Category category;
    private Brand brand;
    private List<String> images;
}
