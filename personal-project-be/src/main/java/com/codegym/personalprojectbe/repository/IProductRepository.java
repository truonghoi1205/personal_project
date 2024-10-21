package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByBrandNameIgnoreCase(String brandName);
    List<Product> findByCategoryNameIgnoreCase(String categoryName);
    Product findBySlug(String slug);

}
