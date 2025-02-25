package com.tiendavirtual.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

// model/Product.java
@Entity
@Table(name = "products")
@Data // Genera automáticamente getters/setters
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;

    private String description;

    @DecimalMin("0.0")
    private BigDecimal price;

    @Min(0)
    private Integer stock;

    @ElementCollection
    private List<String> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}