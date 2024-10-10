package com.codegym.personalprojectbe.controller;

import com.codegym.personalprojectbe.dto.ProductDTO;
import com.codegym.personalprojectbe.dto.ProductDetailDTO;
import com.codegym.personalprojectbe.model.Product;
import com.codegym.personalprojectbe.model.ProductDetail;
import com.codegym.personalprojectbe.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private IProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO) {
        Product product = productService.createProduct(productDTO);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/detail")
    public ResponseEntity<ProductDetail> createProductDetail(@RequestBody ProductDetailDTO productDetailDTO) {
        ProductDetail productDetail = productService.createProductDetail(productDetailDTO);
        return ResponseEntity.ok(productDetail);
    }

    @GetMapping("/thuong-hieu/{brandName}")
    public ResponseEntity<List<Product>> getAllProductByBrand(@PathVariable String brandName) {
        String originalBrandName = brandName.replace("-", " ").toLowerCase();
        List<Product> products = productService.getAllProductByBrandName(originalBrandName);

        if (products.isEmpty()) {
            System.out.println("Không có sản phẩm nào cho thương hiệu: " + originalBrandName);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/phan-loai/{categoryName}")
    public ResponseEntity<List<Product>> getAllProductByCategory(@PathVariable String categoryName) {
        String originalCategoryName = categoryName.replace("-", " ").toLowerCase();
        List<Product> products = productService.getAllProductByCategoryName(originalCategoryName);

        if (products.isEmpty()) {
            System.out.println("Không có sản phẩm nào cho phân loại: " + originalCategoryName);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

}
