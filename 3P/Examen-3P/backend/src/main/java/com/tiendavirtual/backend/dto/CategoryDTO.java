package com.tiendavirtual.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// dto/CategoryDTO.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Integer id;
    private String name;
}