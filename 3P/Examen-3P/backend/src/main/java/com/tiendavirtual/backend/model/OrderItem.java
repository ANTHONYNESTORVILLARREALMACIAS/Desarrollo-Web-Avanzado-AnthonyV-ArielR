package com.tiendavirtual.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_items")
@Data // Genera automáticamente getters/setters
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Min(1)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
