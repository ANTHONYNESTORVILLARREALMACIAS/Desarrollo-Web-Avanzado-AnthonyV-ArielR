package com.tiendavirtual.backend.controller;

import com.tiendavirtual.backend.dto.CartDTO;
import com.tiendavirtual.backend.dto.CartItemRequest;
import com.tiendavirtual.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CartDTO> getCart() {
        return ResponseEntity.ok(cartService.getUserCart());
    }

    @PostMapping("/items")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CartDTO> addItemToCart(@Valid @RequestBody CartItemRequest itemRequest) {
        return ResponseEntity.ok(cartService.addItemToCart(itemRequest));
    }

    @PutMapping("/items/{itemId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CartDTO> updateCartItem(
            @PathVariable Integer itemId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateCartItem(itemId, quantity));
    }

    @DeleteMapping("/items/{itemId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CartDTO> removeItemFromCart(@PathVariable Integer itemId) {
        return ResponseEntity.ok(cartService.removeItemFromCart(itemId));
    }
}