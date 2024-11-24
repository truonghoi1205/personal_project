package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductDetailRepository extends JpaRepository<ProductDetail,Long> {
}
