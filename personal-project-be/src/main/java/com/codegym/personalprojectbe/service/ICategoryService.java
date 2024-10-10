package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.dto.CategoryDTO;
import com.codegym.personalprojectbe.model.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategory();

    Category createCategory(CategoryDTO categoryDTO);

    Category updateCategory(Long id, CategoryDTO categoryDTO);

    void deleteCategory(Long id);
}
