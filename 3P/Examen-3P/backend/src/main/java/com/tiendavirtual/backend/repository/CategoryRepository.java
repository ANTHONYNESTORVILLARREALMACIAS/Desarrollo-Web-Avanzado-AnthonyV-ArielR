package com.tiendavirtual.backend.repository;

import com.tiendavirtual.backend.model.Category;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// repository/CategoryRepository.java
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByName(String name);

    boolean existsByName(@NotBlank String name);
}