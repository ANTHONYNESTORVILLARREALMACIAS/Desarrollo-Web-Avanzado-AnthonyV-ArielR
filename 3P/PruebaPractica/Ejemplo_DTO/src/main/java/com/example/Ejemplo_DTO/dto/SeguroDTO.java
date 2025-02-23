package com.example.Ejemplo_DTO.dto;

public class SeguroDTO {
    private Long id;
    private double costoTotal;
    private Long automovilId;

    //constructor


    public SeguroDTO(Long id, double costoTotal, Long automovilId) {
        this.id = id;
        this.costoTotal = costoTotal;
        this.automovilId = automovilId;
    }

    //getter - setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getCostoTotal() {
        return costoTotal;
    }

    public void setCostoTotal(double costoTotal) {
        this.costoTotal = costoTotal;
    }

    public Long getAutomovilId() {
        return automovilId;
    }

    public void setAutomovilId(Long automovilId) {
        this.automovilId = automovilId;
    }
}
