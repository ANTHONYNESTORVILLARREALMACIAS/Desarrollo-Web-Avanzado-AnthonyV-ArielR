package com.tiendavirtual.backend.repository;

import com.tiendavirtual.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// repository/UserRepository.java
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}