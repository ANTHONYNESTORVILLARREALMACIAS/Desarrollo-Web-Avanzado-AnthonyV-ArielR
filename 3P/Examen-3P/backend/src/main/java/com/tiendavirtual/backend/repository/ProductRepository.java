package com.tiendavirtual.backend.repository;

import com.tiendavirtual.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;

// repository/ProductRepository.java
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findByCategoryId(Integer categoryId, Pageable pageable);
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
}