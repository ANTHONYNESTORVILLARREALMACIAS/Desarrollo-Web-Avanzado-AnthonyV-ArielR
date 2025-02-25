package com.tiendavirtual.backend.service;

import com.tiendavirtual.backend.dto.PasswordChangeRequest;
import com.tiendavirtual.backend.dto.RegisterRequest;
import com.tiendavirtual.backend.dto.UserDTO;
import com.tiendavirtual.backend.exception.ResourceNotFoundException;
import com.tiendavirtual.backend.model.User;
import com.tiendavirtual.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public UserDTO createUser(RegisterRequest registerRequest) {
        if(userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email ya registrado");
        }

        User user = modelMapper.map(registerRequest, User.class);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user = userRepository.save(user);

        return modelMapper.map(user, UserDTO.class);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return modelMapper.map(user, UserDTO.class);
    }

    @Transactional
    public UserDTO updateUser(Integer id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        modelMapper.map(userDTO, user);
        user.setId(id);
        return modelMapper.map(userRepository.save(user), UserDTO.class);
    }

    @Transactional
    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        userRepository.delete(user);
    }

    @Transactional
    public void changePassword(Integer id, PasswordChangeRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña actual incorrecta");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}