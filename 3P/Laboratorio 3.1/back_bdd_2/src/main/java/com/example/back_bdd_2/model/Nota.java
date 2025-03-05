package com.example.back_bdd_2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "notas")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String asignatura;
    private Double nota;

    @Temporal(TemporalType.DATE)
    private Date fechaRegistro;

    @ManyToOne
    @JoinColumn(name = "id_estudiante", nullable = false)
    @JsonBackReference  // Evita la serialización cíclica
    private Estudiante estudiante;

    public Nota() {
    }

    public Nota(String asignatura, Double nota, Date fechaRegistro, Estudiante estudiante) {
        this.asignatura = asignatura;
        this.nota = nota;
        this.fechaRegistro = fechaRegistro;
        this.estudiante = estudiante;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(String asignatura) {
        this.asignatura = asignatura;
    }

    public Double getNota() {
        return nota;
    }

    public void setNota(Double nota) {
        this.nota = nota;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }
}
