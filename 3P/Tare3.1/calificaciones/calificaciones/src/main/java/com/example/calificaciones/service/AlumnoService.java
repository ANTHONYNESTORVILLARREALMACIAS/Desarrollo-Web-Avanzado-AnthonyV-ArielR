package com.example.calificaciones.service;

import com.example.calificaciones.model.Alumno;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AlumnoService {
    private static final String FILE_PATH = "alumnos.json";
    private List<Alumno> alumnos = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Constructor que carga los alumnos desde el JSON al iniciar la aplicación
    public AlumnoService() {
        cargarAlumnos();
    }

    // Cargar alumnos desde el archivo JSON
    private void cargarAlumnos() {
        try {
            File file = new File(FILE_PATH);
            if (file.exists() && file.length() > 0) { // Verifica si el archivo no está vacío
                alumnos = objectMapper.readValue(file, new TypeReference<List<Alumno>>() {});
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Guardar alumnos en el archivo JSON
    private void guardarAlumnos() {
        try {
            objectMapper.writeValue(new File(FILE_PATH), alumnos);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Obtener todos los alumnos
    public List<Alumno> obtenerTodos() {
        return alumnos;
    }

    // Agregar un nuevo alumno
    public void agregarAlumno(Alumno alumno) {
        alumno.setId(UUID.randomUUID().toString()); // Generar ID único
        alumnos.add(alumno);
        guardarAlumnos();
    }

    // Obtener un alumno por su ID
    public Optional<Alumno> obtenerAlumnoPorId(String id) {
        return alumnos.stream().filter(a -> a.getId().equals(id)).findFirst();
    }

    // Actualizar un alumno manteniendo su ID
    public void actualizarAlumno(String id, Alumno alumnoActualizado) {
        for (Alumno alumno : alumnos) {
            if (alumno.getId().equals(id)) {
                alumno.setNombre(alumnoActualizado.getNombre());
                alumno.setNota(alumnoActualizado.getNota());
                guardarAlumnos();
                return;
            }
        }
    }

    // Eliminar un alumno por su ID
    public void eliminarAlumno(String id) {
        alumnos.removeIf(a -> a.getId().equals(id));
        guardarAlumnos();
    }

    // Filtrar alumnos por un rango de notas
    public List<Alumno> filtrarPorNota(double min, double max) {
        return alumnos.stream()
                .filter(a -> a.getNota() >= min && a.getNota() <= max)
                .collect(Collectors.toList());
    }

    // Ordenar alumnos por nota de mayor a menor
    public List<Alumno> ordenarPorNotaDescendente() {
        return alumnos.stream()
                .sorted(Comparator.comparingDouble(Alumno::getNota).reversed())
                .collect(Collectors.toList());
    }
}
