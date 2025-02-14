package com.example.back_bdd_2.repository;



import com.example.back_bdd_2.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
}

