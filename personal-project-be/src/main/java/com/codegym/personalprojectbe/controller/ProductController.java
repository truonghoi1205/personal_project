package com.codegym.personalprojectbe.controller;

import com.codegym.personalprojectbe.dto.ProductDTO;
import com.codegym.personalprojectbe.model.Product;
import com.codegym.personalprojectbe.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        productService.createProductWithDetails(productDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProductById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        productService.updateProduct(id, productDTO);
        return new ResponseEntity<>("{}", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detailProduct(@PathVariable Long id) {
        try {
            Product product = productService.findProductById(id);
            if (product == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm");
            }
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Kết nối bị gián đoạn");
        }
    }

    @GetMapping("/thuong-hieu/{brandName}")
    public ResponseEntity<List<Product>> getAllProductByBrand(@PathVariable String brandName) {
        String originalBrandName = brandName.replace("-", " ").toLowerCase();
        List<Product> products = productService.getAllProductByBrandName(originalBrandName);

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/phan-loai/{categoryName}")
    public ResponseEntity<List<Product>> getAllProductByCategory(@PathVariable String categoryName) {
        String originalCategoryName = categoryName.replace("-", " ").toLowerCase();
        List<Product> products = productService.getAllProductByCategoryName(originalCategoryName);

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/san-pham/{slug}")
    public ResponseEntity<?> getProductBySlug(@PathVariable String slug) {
        Product product = productService.findBySlug(slug);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Không tìm thấy sản phẩm: " + slug);
        }
        return ResponseEntity.ok(product);
    }


}
