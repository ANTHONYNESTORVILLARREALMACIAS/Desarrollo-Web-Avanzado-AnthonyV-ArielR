package com.tiendavirtual.backend.dto;

import com.tiendavirtual.backend.model.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

// dto/OrderDTO.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Integer id;
    private LocalDateTime orderDate;
    private OrderStatus status;
    private String shippingCarrier;
    private String trackingNumber;
    private Integer userId;
    private List<OrderItemDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDTO {
        private Integer productId;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
    }
}