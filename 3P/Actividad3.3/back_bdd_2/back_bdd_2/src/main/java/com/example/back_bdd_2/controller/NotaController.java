package com.example.back_bdd_2.controller;

import com.example.back_bdd_2.model.Nota;
import com.example.back_bdd_2.service.NotaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @GetMapping
    public List<Nota> obtenerTodas() {
        return notaService.obtenerTodas();
    }

    @PostMapping
    public Nota agregarNota(@RequestBody Nota nota) {
        return notaService.guardar(nota);
    }

    @DeleteMapping("/{id}")
    public void eliminarNota(@PathVariable Long id) {
        notaService.eliminar(id);
    }
}
