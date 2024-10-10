package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.dto.ProductDTO;
import com.codegym.personalprojectbe.dto.ProductDetailDTO;
import com.codegym.personalprojectbe.model.Product;
import com.codegym.personalprojectbe.model.ProductDetail;

import java.util.List;

public interface IProductService {
    List<Product> getAllProducts();

    Product createProduct(ProductDTO productDTO);

    ProductDetail createProductDetail(ProductDetailDTO productDetailDTO);

    List<Product> getAllProductByBrandName(String brandName);

    List<Product> getAllProductByCategoryName(String categoryName);
}
