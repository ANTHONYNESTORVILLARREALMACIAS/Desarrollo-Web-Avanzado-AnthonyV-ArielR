package com.example.Ejemplo_DTO.repository;
import com.example.Ejemplo_DTO.model.Automovil;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AutomovilRepository extends JpaRepository<Automovil, Long> {
    @EntityGraph(attributePaths = {"propietario", "seguro"})
    List<Automovil> findAll();

    @EntityGraph(attributePaths = {"propietario", "seguro"})
    Optional<Automovil> findById(Long id);
}
