package com.example.Ejemplo_DTO.dto;

public class SeguroDTO {
    private Long id;
    private double costoTotal;
    private Long automovilId;
    private String modeloAutomovil;
    private String propietarioNombre;

    //constructor


    public SeguroDTO(Long id, double costoTotal, Long automovilId, String modeloAutomovil, String propietarioNombre) {
        this.id = id;
        this.costoTotal = costoTotal;
        this.automovilId = automovilId;
        this.modeloAutomovil = modeloAutomovil;
        this.propietarioNombre = propietarioNombre;
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

    public String getModeloAutomovil() {
        return modeloAutomovil;
    }

    public void setModeloAutomovil(String modeloAutomovil) {
        this.modeloAutomovil = modeloAutomovil;
    }

    public String getPropietarioNombre() {
        return propietarioNombre;
    }

    public void setPropietarioNombre(String propietarioNombre) {
        this.propietarioNombre = propietarioNombre;
    }
}
