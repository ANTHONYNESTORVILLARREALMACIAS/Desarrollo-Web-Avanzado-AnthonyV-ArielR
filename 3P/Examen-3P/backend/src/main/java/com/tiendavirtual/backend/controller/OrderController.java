package com.tiendavirtual.backend.controller;

import com.tiendavirtual.backend.dto.OrderDTO;
import com.tiendavirtual.backend.model.OrderStatus;
import com.tiendavirtual.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<OrderDTO>> getUserOrders(
            @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(orderService.getUserOrders(pageable));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<OrderDTO> placeOrder() {
        return new ResponseEntity<>(orderService.placeOrder(), HttpStatus.CREATED);
    }

    @PutMapping("/{orderId}/cancel")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<OrderDTO> cancelOrder(@PathVariable Integer orderId) {
        return ResponseEntity.ok(orderService.cancelOrder(orderId));
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<OrderDTO> getOrderDetails(@PathVariable Integer orderId) {
        return ResponseEntity.ok(orderService.getOrderDetails(orderId));
    }

    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @PathVariable Integer orderId,
            @RequestParam OrderStatus status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
    }
}