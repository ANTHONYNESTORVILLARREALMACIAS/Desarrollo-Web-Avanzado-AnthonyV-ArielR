package com.tiendavirtual.backend.service;

import com.tiendavirtual.backend.dto.ProductDTO;
import com.tiendavirtual.backend.exception.ResourceNotFoundException;
import com.tiendavirtual.backend.model.Category;
import com.tiendavirtual.backend.model.Product;
import com.tiendavirtual.backend.repository.CategoryRepository;
import com.tiendavirtual.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(product -> modelMapper.map(product, ProductDTO.class));
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public ProductDTO getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        return modelMapper.map(product, ProductDTO.class);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ProductDTO createProduct(ProductDTO productDTO) {
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        Product product = modelMapper.map(productDTO, Product.class);
        product.setCategory(category);
        product = productRepository.save(product);

        return modelMapper.map(product, ProductDTO.class);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ProductDTO updateProduct(Integer id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        modelMapper.map(productDTO, existingProduct);
        existingProduct.setCategory(category);
        existingProduct = productRepository.save(existingProduct);

        return modelMapper.map(existingProduct, ProductDTO.class);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        productRepository.delete(product);
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public Page<ProductDTO> searchProducts(String name, Integer categoryId, BigDecimal minPrice,
                                           BigDecimal maxPrice, Pageable pageable) {
        if(categoryId != null) {
            return productRepository.findByCategoryId(categoryId, pageable)
                    .map(product -> modelMapper.map(product, ProductDTO.class));
        }
        // Implementar otros filtros según sea necesario
        return productRepository.findAll(pageable)
                .map(product -> modelMapper.map(product, ProductDTO.class));
    }
}