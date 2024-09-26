package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.dto.ProductDTO;
import com.codegym.personalprojectbe.model.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAllProducts();

    Product createProduct(ProductDTO productDTO);
}
