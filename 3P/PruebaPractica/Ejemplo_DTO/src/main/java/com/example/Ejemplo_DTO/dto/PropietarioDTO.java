package com.example.Ejemplo_DTO.dto;

import java.util.List;

public class PropietarioDTO {

    private Long id;
    private String nombreCompleto;
    private int edad;
    private List<Long> automovilesIds;

    // Constructor con parámetros para inicializar todos los campos
    public PropietarioDTO(Long id, String nombreCompleto, int edad, List<Long> automovilesIds) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.edad = edad;
        this.automovilesIds = automovilesIds;
    }

    // Constructor que acepta nombre y apellido como dos parámetros
    public PropietarioDTO(Long id, String nombre, String apellido, int edad, List<Long> automovilesIds) {
        this.id = id;
        this.nombreCompleto = nombre + " " + apellido;  // Combina nombre y apellido
        this.edad = edad;
        this.automovilesIds = automovilesIds;
    }

    // Constructor vacío
    public PropietarioDTO() {
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public List<Long> getAutomovilesIds() {
        return automovilesIds;
    }

    public void setAutomovilesIds(List<Long> automovilesIds) {
        this.automovilesIds = automovilesIds;
    }
}
