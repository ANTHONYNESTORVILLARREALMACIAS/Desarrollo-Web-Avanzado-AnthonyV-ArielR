package com.tiendavirtual.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data // Genera automáticamente getters/setters
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    private String address;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;
}

