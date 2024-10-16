package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.dto.ProductDTO;
import com.codegym.personalprojectbe.model.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAllProducts();

    List<Product> getAllProductByBrandName(String brandName);

    List<Product> getAllProductByCategoryName(String categoryName);

    void createProductWithDetails(ProductDTO productDTO);

    void deleteProductById(Long id);

    Product getProductById(Long id);
}
