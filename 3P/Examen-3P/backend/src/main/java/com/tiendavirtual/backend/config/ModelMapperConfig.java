package com.tiendavirtual.backend.config;

import com.tiendavirtual.backend.dto.OrderDTO;
import com.tiendavirtual.backend.dto.ProductDTO;
import com.tiendavirtual.backend.dto.RegisterRequest;
import com.tiendavirtual.backend.dto.UserDTO;
import com.tiendavirtual.backend.model.Order;
import com.tiendavirtual.backend.model.OrderItem;
import com.tiendavirtual.backend.model.Product;
import com.tiendavirtual.backend.model.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Configuración global
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setSkipNullEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
                .setFieldMatchingEnabled(true);

        // Mapeos personalizados
        configureUserMappings(modelMapper);
        configureProductMappings(modelMapper);
        configureOrderMappings(modelMapper);

        return modelMapper;
    }

    private void configureUserMappings(ModelMapper modelMapper) {
        TypeMap<RegisterRequest, User> userMapping = modelMapper.createTypeMap(RegisterRequest.class, User.class);
        userMapping.addMappings(mapper -> {
            mapper.skip(User::setId);
            mapper.skip(User::setRole);
            mapper.skip(User::setCart);
        });

        modelMapper.createTypeMap(User.class, UserDTO.class)
                .addMapping(src -> src.getCart().getId(), UserDTO::setCartId);
    }

    private void configureProductMappings(ModelMapper modelMapper) {
        TypeMap<ProductDTO, Product> productMapping = modelMapper.createTypeMap(ProductDTO.class, Product.class);
        productMapping.addMappings(mapper -> {
            mapper.skip(Product::setId);
            mapper.<Integer>map(src -> src.getCategoryId(), (dest, v) -> dest.getCategory().setId(v));
        });
    }

    private void configureOrderMappings(ModelMapper modelMapper) {
        modelMapper.createTypeMap(Order.class, OrderDTO.class)
                .addMapping(src -> src.getUser().getId(), OrderDTO::setUserId);

        modelMapper.createTypeMap(OrderItem.class, OrderDTO.OrderItemDTO.class)
                .addMapping(src -> src.getProduct().getName(), OrderDTO.OrderItemDTO::setProductName)
                .addMapping(src -> src.getProduct().getPrice(), OrderDTO.OrderItemDTO::setPrice);
    }
}