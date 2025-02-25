package com.tiendavirtual.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// model/Order.java
@Entity
@Table(name = "orders")
@Data // Genera automáticamente getters/setters
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    private LocalDateTime orderDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDIENTE;

    private String shippingCarrier;
    private String trackingNumber;
}


