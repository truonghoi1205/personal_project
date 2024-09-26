package com.codegym.personalprojectbe.dto;

import com.codegym.personalprojectbe.model.Category;
import com.codegym.personalprojectbe.model.Image;
import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {
    private String sku;
    private String name;
    private double price;
    private String description;
    private String volume;
    private int stock;
    private String brand;
    private String gender;
    private String concentration;
    private String season;
    private List<Image> images;
    private List<Category> categories;
}
