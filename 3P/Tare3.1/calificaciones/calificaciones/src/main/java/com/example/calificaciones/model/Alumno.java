package com.example.calificaciones.model;
import java.util.UUID;

public class Alumno {
    private String id;
    private String nombre;
    private double nota;

    public Alumno() {
        // Generar un ID único al crear un nuevo alumno
        this.id = UUID.randomUUID().toString();
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getNota() {
        return nota;
    }

    public void setNota(double nota) {
        this.nota = nota;
    }
}

