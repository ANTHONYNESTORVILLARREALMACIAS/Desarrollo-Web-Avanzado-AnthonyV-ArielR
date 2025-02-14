package com.example.mvc_service.servicio;

import com.example.mvc_service.modelo.UsuarioModelo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {
    private List<UsuarioModelo> usuarios = new ArrayList<>();

    public List<UsuarioModelo> obtenerUsuarios() {
        return usuarios;
    }

    public void agregarUsuario(UsuarioModelo usuario) {
        usuarios.add(usuario);
    }

    public UsuarioModelo obtenerUsuarioPorId(int index) {
        return usuarios.get(index);
    }

    public void actualizarUsuario(UsuarioModelo usuarioActualizado) {
        // Actualizamos usando el índice
        int index = usuarios.indexOf(usuarioActualizado);
        if (index != -1) {
            usuarios.set(index, usuarioActualizado);
        }
    }

    public void eliminarUsuario(int index) {
        if (index >= 0 && index < usuarios.size()) {
            usuarios.remove(index);
        }
    }
}
