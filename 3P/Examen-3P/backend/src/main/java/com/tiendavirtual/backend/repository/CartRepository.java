package com.tiendavirtual.backend.repository;

import com.tiendavirtual.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// repository/CartRepository.java
public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByUserId(Integer userId);
}