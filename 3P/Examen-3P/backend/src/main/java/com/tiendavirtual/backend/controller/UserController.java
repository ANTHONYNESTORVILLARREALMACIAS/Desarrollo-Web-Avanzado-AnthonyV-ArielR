package com.tiendavirtual.backend.controller;

import com.tiendavirtual.backend.dto.PasswordChangeRequest;
import com.tiendavirtual.backend.dto.UserDTO;
import com.tiendavirtual.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers    ());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == principal.id")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == principal.id")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Integer id,
            @Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/password")
    @PreAuthorize("hasRole('ADMIN') or #id == principal.id")
    public ResponseEntity<Void> changePassword(
            @PathVariable Integer id,
            @Valid @RequestBody PasswordChangeRequest request) {
        userService.changePassword(id, request);
        return ResponseEntity.ok().build();
    }
}