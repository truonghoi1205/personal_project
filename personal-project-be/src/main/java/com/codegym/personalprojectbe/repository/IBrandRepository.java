package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBrandRepository extends JpaRepository<Brand,Long> {
    Brand findByName(String name);
}
