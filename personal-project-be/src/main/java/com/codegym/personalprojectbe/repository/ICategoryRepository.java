package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category,Long> {
    Category findByName(String name);
}
