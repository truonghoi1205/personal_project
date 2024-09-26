package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product, Long> {
}
