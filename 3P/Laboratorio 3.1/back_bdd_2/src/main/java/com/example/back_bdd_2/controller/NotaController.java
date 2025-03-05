package com.example.back_bdd_2.controller;

import com.example.back_bdd_2.model.Estudiante;
import com.example.back_bdd_2.model.Nota;
import com.example.back_bdd_2.service.NotaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "http://localhost:4200")
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

    // Nota del estudiante
    @PutMapping("/{id}")
    public ResponseEntity<Nota> actualizarNota(@PathVariable Long id, @RequestBody Nota notasDetalles) {
        return notaService.actualizar(id, notasDetalles)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void eliminarNota(@PathVariable Long id) {
        notaService.eliminar(id);
    }
}
