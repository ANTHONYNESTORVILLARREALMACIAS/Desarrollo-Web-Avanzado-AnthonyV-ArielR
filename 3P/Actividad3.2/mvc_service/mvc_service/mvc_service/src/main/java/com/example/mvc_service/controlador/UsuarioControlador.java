package com.example.mvc_service.controlador;

import com.example.mvc_service.modelo.UsuarioModelo;
import com.example.mvc_service.servicio.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/usuarios")
public class UsuarioControlador {
    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioControlador(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public String mostrarUsuarios(Model model) {
        model.addAttribute("usuarios", usuarioService.obtenerUsuarios());
        return "usuarios";
    }

    @GetMapping("/nuevo")
    public String mostrarFormularioNuevoUsuario(Model model) {
        model.addAttribute("usuario", new UsuarioModelo());
        return "formulario_usuario";
    }

    @PostMapping
    public String agregarUsuario(@ModelAttribute UsuarioModelo usuario) {
        usuarioService.agregarUsuario(usuario);
        return "redirect:/usuarios";
    }

    @GetMapping("/editar/{index}")
    public String mostrarFormularioEditarUsuario(@PathVariable int index, Model model) {
        UsuarioModelo usuario = usuarioService.obtenerUsuarioPorId(index);
        if (usuario != null) {
            model.addAttribute("usuario", usuario);
        }
        return "formulario_usuario";
    }

    @GetMapping("/eliminar/{index}")
    public String eliminarUsuario(@PathVariable int index) {
        usuarioService.eliminarUsuario(index);
        return "redirect:/usuarios";
    }
}
