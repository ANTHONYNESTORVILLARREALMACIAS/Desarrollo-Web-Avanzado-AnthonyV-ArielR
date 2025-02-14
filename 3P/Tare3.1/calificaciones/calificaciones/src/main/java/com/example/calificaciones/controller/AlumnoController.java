package com.example.calificaciones.controller;

import com.example.calificaciones.model.Alumno;
import com.example.calificaciones.service.AlumnoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = "*")
public class AlumnoController {
    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @GetMapping
    public List<Alumno> obtenerTodos() {
        return alumnoService.obtenerTodos();
    }

    @PostMapping
    public void agregarAlumno(@RequestBody Alumno alumno) {
        alumnoService.agregarAlumno(alumno);
    }

    @GetMapping("/{id}")
    public Optional<Alumno> obtenerAlumnoPorId(@PathVariable String id) {
        return alumnoService.obtenerAlumnoPorId(id);
    }

    @PutMapping("/{id}")
    public void actualizarAlumno(@PathVariable String id, @RequestBody Alumno alumno) {
        alumnoService.actualizarAlumno(id, alumno);
    }

    @DeleteMapping("/{id}")
    public void eliminarAlumno(@PathVariable String id) {
        alumnoService.eliminarAlumno(id);
    }

    @GetMapping("/filtrar")
    public List<Alumno> filtrarPorNota(@RequestParam double min, @RequestParam double max) {
        return alumnoService.filtrarPorNota(min, max);
    }

    @GetMapping("/ordenar")
    public List<Alumno> ordenarPorNotaDescendente() {
        return alumnoService.ordenarPorNotaDescendente();
    }
}
