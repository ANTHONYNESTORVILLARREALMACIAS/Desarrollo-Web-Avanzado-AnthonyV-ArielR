package com.tiendavirtual.backend.repository;

import com.tiendavirtual.backend.model.Order;
import com.tiendavirtual.backend.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// repository/OrderRepository.java
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Page<Order> findByUserId(Integer userId, Pageable pageable);
    List<Order> findByStatus(OrderStatus status);
}