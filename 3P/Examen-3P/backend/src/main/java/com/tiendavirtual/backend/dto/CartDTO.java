package com.tiendavirtual.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// dto/CartDTO.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Integer userId;
    private List<CartItemDTO> items;

    @Data
    public static class CartItemDTO {
        private Integer productId;
        private Integer quantity;
    }
}