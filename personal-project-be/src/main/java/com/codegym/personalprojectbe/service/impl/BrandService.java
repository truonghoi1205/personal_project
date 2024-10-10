package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.dto.BrandDTO;
import com.codegym.personalprojectbe.exception.ResourceNotFoundException;
import com.codegym.personalprojectbe.model.Brand;
import com.codegym.personalprojectbe.repository.IBrandRepository;
import com.codegym.personalprojectbe.service.IBrandService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BrandService implements IBrandService {

    private final IBrandRepository brandRepository;

    @Override
    public List<Brand> getAllBrand() {
        return brandRepository.findAll();
    }

    @Override
    public Brand createBrand(BrandDTO brandDTO) {
        Brand brand = Brand.builder()
                .name(brandDTO.getName())
                .description(brandDTO.getDescription())
                .image(brandDTO.getImage())
                .logo(brandDTO.getLogo())
                .build();

        return brandRepository.save(brand);
    }

    @Override
    public Brand updateBrand(Long id, BrandDTO brandDTO) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thương hiệu có id:  " + id));
        brand.setName(brandDTO.getName());
        brand.setDescription(brandDTO.getDescription());
        brand.setImage(brandDTO.getImage());
        brand.setLogo(brandDTO.getLogo());
        return brandRepository.save(brand);
    }

    @Override
    public void deleteBrand(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thương hiệu có id: " + id));
        brandRepository.delete(brand);
    }
}
