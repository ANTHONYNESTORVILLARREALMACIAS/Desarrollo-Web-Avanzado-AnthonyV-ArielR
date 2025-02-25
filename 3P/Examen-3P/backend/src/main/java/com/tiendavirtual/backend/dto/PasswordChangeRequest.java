package com.tiendavirtual.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// dto/PasswordChangeRequest.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeRequest {
    @NotBlank
    @Size(min = 6)
    private String oldPassword;

    @NotBlank
    @Size(min = 6)
    private String newPassword;
}

