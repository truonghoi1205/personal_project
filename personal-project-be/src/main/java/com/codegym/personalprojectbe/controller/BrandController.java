package com.codegym.personalprojectbe.controller;

import com.codegym.personalprojectbe.dto.BrandDTO;
import com.codegym.personalprojectbe.model.Brand;
import com.codegym.personalprojectbe.service.IBrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
public class BrandController {

    private final IBrandService brandService;

    // Lấy danh sách tất cả Brand
    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrand() {
        List<Brand> brands = brandService.getAllBrand();
        return ResponseEntity.ok(brands);
    }

    // Tạo Brand mới
    @PostMapping
    public ResponseEntity<Brand> createBrand(@RequestBody BrandDTO brandDTO) {
        Brand brand = brandService.createBrand(brandDTO);
        return ResponseEntity.ok(brand);
    }

    // Cập nhật Brand
    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Long id, @RequestBody BrandDTO brandDTO) {
        Brand updatedBrand = brandService.updateBrand(id, brandDTO);
        return ResponseEntity.ok(updatedBrand);
    }

    // Xóa Brand
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }
}
