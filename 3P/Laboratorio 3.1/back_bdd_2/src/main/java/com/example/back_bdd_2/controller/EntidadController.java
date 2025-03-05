    package com.example.back_bdd_2.controller;

    import com.example.back_bdd_2.model.Estudiante;
    import com.example.back_bdd_2.service.EstudianteService;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;
    import java.util.Optional;

    @RestController
    @RequestMapping("/api/estudiantes")
    @CrossOrigin(origins = "http://localhost:4200")
    public class EntidadController {

        private final EstudianteService estudianteService;

        public EntidadController(EstudianteService estudianteService) {
            this.estudianteService = estudianteService;
        }

        //Obtener todos los estudiantes
        @GetMapping
        public List<Estudiante> obtenerTodos() {
            return estudianteService.obtenerTodos();
        }

        //Obtener estudiante por ID
        @GetMapping("/{id}")
        public ResponseEntity<Estudiante> obtenerPorId(@PathVariable Long id) {
            Optional<Estudiante> estudiante = estudianteService.obtenerPorId(id);
            return estudiante.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }

        //Crear un estudiante
        @PostMapping
        public Estudiante agregarEstudiante(@RequestBody Estudiante estudiante) {
            return estudianteService.guardar(estudiante);
        }

        // Actualizar un estudiante
        @PutMapping("/{id}")
        public ResponseEntity<Estudiante> actualizarEstudiante(@PathVariable Long id, @RequestBody Estudiante estudianteDetalles) {
            return estudianteService.actualizar(id, estudianteDetalles)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }

        //Eliminar un estudiante
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> eliminarEstudiante(@PathVariable Long id) {
            estudianteService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
    }
