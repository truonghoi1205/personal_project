package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.dto.ProductDTO;
import com.codegym.personalprojectbe.model.Image;
import com.codegym.personalprojectbe.model.Product;
import com.codegym.personalprojectbe.model.Property;
import com.codegym.personalprojectbe.repository.IImageRepository;
import com.codegym.personalprojectbe.repository.IProductRepository;
import com.codegym.personalprojectbe.repository.IPropertyRepository;
import com.codegym.personalprojectbe.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

    private final IProductRepository productRepository;
    private final IImageRepository imageRepository;
    private final IPropertyRepository propertyRepository;


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product createProduct(ProductDTO productDTO) {
        Random random = new Random();
        int randomNumber = 100000 + random.nextInt(900000);
        String generatedCode = "MSP-" + randomNumber;

        Product product = Product.builder()
                .sku(generatedCode)
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .description(productDTO.getDescription())
                .volume(productDTO.getVolume())
                .stock(productDTO.getStock())
                .build();



        Set<Image> images = new HashSet<>();
//        if (productDTO.getImages() != null) {
//            for (String url : productDTO.getImages()) {
//                Image image = Image.builder()
//                        .url(url)
//                        .product(product)
//                        .build();
//                image = imageRepository.save(image);
//                images.add(image);
//            }
//        }
        return productRepository.save(product);
    }


}
