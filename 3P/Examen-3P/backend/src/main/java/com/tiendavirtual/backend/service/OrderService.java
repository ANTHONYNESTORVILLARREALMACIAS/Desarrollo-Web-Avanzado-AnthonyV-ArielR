package com.tiendavirtual.backend.service;

import com.tiendavirtual.backend.dto.CartDTO;
import com.tiendavirtual.backend.dto.OrderDTO;
import com.tiendavirtual.backend.exception.ResourceNotFoundException;
import com.tiendavirtual.backend.model.*;
import com.tiendavirtual.backend.repository.OrderRepository;
import com.tiendavirtual.backend.repository.ProductRepository;
import com.tiendavirtual.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public OrderDTO placeOrder() {
        CartDTO cartDTO = cartService.getUserCart();
        if(cartDTO.getItems().isEmpty()) {
            throw new RuntimeException("Carrito vacío");
        }

        Order order = new Order();
        order.setUser(getCurrentUser());

        for(CartDTO.CartItemDTO itemDTO : cartDTO.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

            if(product.getStock() < itemDTO.getQuantity()) {
                throw new RuntimeException("Stock insuficiente para: " + product.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setOrder(order);
            order.getItems().add(orderItem);

            product.setStock(product.getStock() - itemDTO.getQuantity());
            productRepository.save(product);
        }

        order.setStatus(OrderStatus.PENDIENTE);
        order = orderRepository.save(order);

        // Limpiar carrito
        cartService.clearCart();

        return modelMapper.map(order, OrderDTO.class);
    }

    @Transactional(readOnly = true)
    public Page<OrderDTO> getUserOrders(Pageable pageable) {
        User user = getCurrentUser();
        return orderRepository.findByUserId(user.getId(), pageable)
                .map(order -> modelMapper.map(order, OrderDTO.class));
    }

    @Transactional
    public OrderDTO cancelOrder(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));

        if(order.getStatus() != OrderStatus.PENDIENTE) {
            throw new RuntimeException("No se puede cancelar un pedido en estado: " + order.getStatus());
        }

        order.setStatus(OrderStatus.CANCELADO);
        return modelMapper.map(orderRepository.save(order), OrderDTO.class);
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuario no autenticado"));
    }

    @Transactional(readOnly = true)
    public OrderDTO getOrderDetails(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));

        // Verificar que el usuario tiene permiso
        User currentUser = getCurrentUser();
        if (!currentUser.getRole().equals(Role.ADMIN) &&
                !order.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("No autorizado para ver este pedido");
        }

        return modelMapper.map(order, OrderDTO.class);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public OrderDTO updateOrderStatus(Integer orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));

        // Validar transiciones de estado
        if (order.getStatus() == OrderStatus.ENTREGADO ||
                order.getStatus() == OrderStatus.CANCELADO) {
            throw new RuntimeException("No se puede modificar un pedido finalizado");
        }

        order.setStatus(status);
        order = orderRepository.save(order);

        // Aquí podrías agregar notificaciones al usuario
        return modelMapper.map(order, OrderDTO.class);
    }
}