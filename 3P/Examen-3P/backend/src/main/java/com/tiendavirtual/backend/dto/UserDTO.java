package com.tiendavirtual.backend.dto;

import com.tiendavirtual.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// dto/UserDTO.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Integer id;
    private String name;
    private String email;
    private String address;
    private Role role;
    private Integer cartId;


}