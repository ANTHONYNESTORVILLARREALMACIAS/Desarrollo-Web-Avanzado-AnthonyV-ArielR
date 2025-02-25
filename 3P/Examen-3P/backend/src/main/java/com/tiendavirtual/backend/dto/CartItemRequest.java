package com.tiendavirtual.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// dto/CartItemRequest.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemRequest {
    @NotNull
    private Integer productId;

    @Min(1)
    private Integer quantity;
}
