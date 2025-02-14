package com.example.back_bdd_2.controller;



import com.example.back_bdd_2.model.Estudiante;
import com.example.back_bdd_2.service.EstudianteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
public class EntidadController {

    private final EstudianteService estudianteService;

    public EntidadController(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    @GetMapping
    public List<Estudiante> obtenerTodos() {
        return estudianteService.obtenerTodos();
    }
//
@PutMapping("/{id}")
public ResponseEntity<Estudiante> actualizarEstudiante(@PathVariable Long id, @RequestBody Estudiante estudianteDetalles) {
    return estudianteService.actualizar(id, estudianteDetalles)
            .map(ResponseEntity::ok)  // Devuelve 200 OK si se actualiza correctamente
            .orElseGet(() -> ResponseEntity.notFound().build());  // Devuelve 404 si no existe
}
//
    @PostMapping
    public Estudiante agregarEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteService.guardar(estudiante);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarEstudiante(@PathVariable Long id) {
        if (estudianteService.existePorId(id)) {
            estudianteService.eliminar(id);
            return ResponseEntity.ok("Estudiante eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("Estudiante no encontrado.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> obtenerPorId(@PathVariable Long id) {
        return estudianteService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}

