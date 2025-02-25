package com.tiendavirtual.backend.controller;

import com.tiendavirtual.backend.dto.AuthResponse;
import com.tiendavirtual.backend.dto.LoginRequest;
import com.tiendavirtual.backend.dto.RegisterRequest;
import com.tiendavirtual.backend.dto.UserDTO;
import com.tiendavirtual.backend.security.JwtTokenProvider;
import com.tiendavirtual.backend.security.UserPrincipal;
import com.tiendavirtual.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new AuthResponse(
                jwt,
                userPrincipal.getId(),
                userPrincipal.getName(),
                userPrincipal.getUsername(),
                userPrincipal.getRole()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        UserDTO createdUser = userService.createUser(registerRequest);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
