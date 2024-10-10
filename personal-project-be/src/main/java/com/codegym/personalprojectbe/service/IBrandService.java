package com.codegym.personalprojectbe.service;

import com.codegym.personalprojectbe.dto.BrandDTO;
import com.codegym.personalprojectbe.model.Brand;

import java.util.List;

public interface IBrandService {
    List<Brand> getAllBrand();

    Brand createBrand(BrandDTO brandDTO);

    Brand updateBrand(Long id, BrandDTO brandDTO);

    void deleteBrand(Long id);
}
