package com.tiendavirtual.backend.dto;

import com.tiendavirtual.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// dto/AuthResponse.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Integer id;
    private String name;
    private String email;
    private Role role;

    public AuthResponse(String token, Integer id, String name, String email, Role role) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}