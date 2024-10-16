package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.dto.ProductDTO;
import com.codegym.personalprojectbe.dto.ProductDetailDTO;
import com.codegym.personalprojectbe.model.*;
import com.codegym.personalprojectbe.repository.IBrandRepository;
import com.codegym.personalprojectbe.repository.ICategoryRepository;
import com.codegym.personalprojectbe.repository.IImageRepository;
import com.codegym.personalprojectbe.repository.IProductRepository;
import com.codegym.personalprojectbe.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

    private final IProductRepository productRepository;
    private final IImageRepository imageRepository;
    private final IBrandRepository brandRepository;
    private final ICategoryRepository categoryRepository;


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public void createProductWithDetails(ProductDTO productDTO) {
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow();
        Brand brand = brandRepository.findById(productDTO.getBrandId()).orElseThrow();

        Random random = new Random();
        int randomNumber = 100000 + random.nextInt(900000);
        String generatedCode = "MSP-" + randomNumber;

        Set<Image> images = new HashSet<>();
        if (productDTO.getImages() != null) {
            for (String url : productDTO.getImages()) {
                Image image = Image.builder()
                        .url(url)
                        .build();
                image = imageRepository.save(image);
                images.add(image);
            }
        }

        Product product = Product.builder()
                .sku(generatedCode)
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .concentration(productDTO.getConcentration())
                .session(productDTO.getSeason())
                .category(category)
                .brand(brand)
                .build();

        List<ProductDetail> details = productDTO.getProductDetails().stream()
                .map(detailDTO -> ProductDetail.builder()
                        .volume(detailDTO.getVolume())
                        .stock(detailDTO.getStock())
                        .price(detailDTO.getPrice())
                        .product(product)
                        .build())
                .collect(Collectors.toList());

        product.setProductDetails(details);
        productRepository.save(product);
    }

    @Override
    public void deleteProductById(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        } else {
            throw new RuntimeException("Sản phẩm không tồn tại với ID: " + id);
        }
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }


    @Override
    public List<Product> getAllProductByBrandName(String brandName) {
        return productRepository.findByBrandNameIgnoreCase(brandName);
    }

    @Override
    public List<Product> getAllProductByCategoryName(String categoryName) {
        return productRepository.findByCategoryNameIgnoreCase(categoryName);
    }

}
