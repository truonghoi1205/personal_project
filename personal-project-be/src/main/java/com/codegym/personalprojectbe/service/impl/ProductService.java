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

import java.util.*;
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
        Product product = Product.builder()
                .sku(generatedCode)
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .concentration(productDTO.getConcentration())
                .season(productDTO.getSeason())
                .slug(generateSlug(productDTO.getName(), productDTO.getConcentration()))
                .version(getShortVersion(productDTO.getConcentration()))
                .category(category)
                .brand(brand)
                .build();
        Set<Image> images = new HashSet<>();
        if (productDTO.getImages() != null) {
            for (String url : productDTO.getImages()) {
                Image image = Image.builder()
                        .url(url)
                        .build();
                images.add(image);
            }
        }
        product.setImages(images);
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
    public Product findProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }


    @Override
    public Product findBySlug(String slug) {
        return productRepository.findBySlug(slug);
    }

    @Override
    public Product updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setConcentration(productDTO.getConcentration());
        product.setSeason(productDTO.getSeason());
        product.setBrand(brandRepository.findById(productDTO.getBrandId()).orElse(null));
        product.setCategory(categoryRepository.findById(productDTO.getCategoryId()).orElse(null));
        if (productDTO.getProductDetails() != null) {
            Map<Integer, ProductDetail> existingDetailsMap = product.getProductDetails().stream()
                    .collect(Collectors.toMap(ProductDetail::getVolume, detail -> detail));
            List<ProductDetail> updatedDetails = productDTO.getProductDetails().stream()
                    .map(detailDTO -> {
                        ProductDetail detail = existingDetailsMap.get(detailDTO.getVolume());
                        if (detail != null) {
                            detail.setStock(detailDTO.getStock());
                            detail.setPrice(detailDTO.getPrice());
                        } else {
                            detail = ProductDetail.builder()
                                    .volume(detailDTO.getVolume())
                                    .stock(detailDTO.getStock())
                                    .price(detailDTO.getPrice())
                                    .product(product)
                                    .build();
                        }
                        return detail;
                    })
                    .collect(Collectors.toList());

            product.setProductDetails(updatedDetails);
        }
        if (productDTO.getImages() != null) {
            Set<Image> imagesToRemove = product.getImages().stream()
                    .filter(image -> !productDTO.getImages().contains(image.getUrl()))
                    .collect(Collectors.toSet());
            product.getImages().removeAll(imagesToRemove);
            for (String imageUrl : productDTO.getImages()) {
                boolean exists = product.getImages().stream()
                        .anyMatch(image -> image.getUrl().equals(imageUrl));
                if (!exists) {
                    Image newImage = new Image();
                    newImage.setUrl(imageUrl);
                }
            }
        }

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProductBySeason(String season) {
        return productRepository.findAllBySeasonIgnoreCase(season);
    }

    @Override
    public List<Product> getAllProductByBrandName(String brandName) {
        return productRepository.findByBrandNameIgnoreCase(brandName);
    }

    @Override
    public List<Product> getAllProductByCategoryName(String categoryName) {
        return productRepository.findByCategoryNameIgnoreCase(categoryName);
    }

    private String getShortVersion(String concentration) {
        switch (concentration) {
            case "Eau de Parfum":
                return "edp";
            case "Eau de Toilette":
                return "edt";
            default:
                return concentration.toLowerCase().replaceAll(" ", "-");
        }
    }

    private String generateSlug(String name, String concentration) {
        String version = getShortVersion(concentration);
        String rawSlug = name + " " + version;
        return rawSlug.toLowerCase()
                .replaceAll(" ", "-")
                .replaceAll("[^a-z0-9-]", "");
    }

}
