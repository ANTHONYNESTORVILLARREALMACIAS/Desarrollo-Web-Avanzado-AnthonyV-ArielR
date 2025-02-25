package com.tiendavirtual.backend.service;

import com.tiendavirtual.backend.dto.CartDTO;
import com.tiendavirtual.backend.dto.CartItemRequest;
import com.tiendavirtual.backend.exception.ResourceNotFoundException;
import com.tiendavirtual.backend.model.Cart;
import com.tiendavirtual.backend.model.CartItem;
import com.tiendavirtual.backend.model.Product;
import com.tiendavirtual.backend.model.User;
import com.tiendavirtual.backend.repository.CartRepository;
import com.tiendavirtual.backend.repository.ProductRepository;
import com.tiendavirtual.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public CartDTO getUserCart() {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado"));
        return mapCartToDTO(cart);
    }

    @Transactional
    public CartDTO addItemToCart(CartItemRequest itemRequest) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> createNewCart(user));

        Product product = productRepository.findById(itemRequest.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        // Verificar si el producto ya está en el carrito
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();

        if(existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + itemRequest.getQuantity());
        } else {
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setQuantity(itemRequest.getQuantity());
            newItem.setCart(cart);
            cart.getItems().add(newItem);
        }

        cart = cartRepository.save(cart);
        return mapCartToDTO(cart);
    }

    private Cart createNewCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    private CartDTO mapCartToDTO(Cart cart) {
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cartDTO.setUserId(cart.getUser().getId());
        return cartDTO;
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuario no autenticado"));
    }

    @Transactional
    public void clearCart() {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado"));

        // Eliminar todos los ítems del carrito
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    @Transactional
    public CartDTO updateCartItem(Integer itemId, Integer quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor a 0");
        }

        Cart cart = getCurrentUserCart();
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Ítem no encontrado en el carrito"));

        // Verificar stock disponible
        Product product = item.getProduct();
        if (product.getStock() < quantity) {
            throw new RuntimeException("Stock insuficiente para: " + product.getName());
        }

        item.setQuantity(quantity);
        cartRepository.save(cart);

        return mapCartToDTO(cart);
    }

    @Transactional
    public CartDTO removeItemFromCart(Integer itemId) {
        Cart cart = getCurrentUserCart();

        boolean removed = cart.getItems().removeIf(item -> item.getId().equals(itemId));
        if (!removed) {
            throw new ResourceNotFoundException("Ítem no encontrado en el carrito");
        }

        cartRepository.save(cart);
        return mapCartToDTO(cart);
    }

    // Método auxiliar para obtener el carrito del usuario actual
    private Cart getCurrentUserCart() {
        User user = getCurrentUser();
        return cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado"));
    }
}
