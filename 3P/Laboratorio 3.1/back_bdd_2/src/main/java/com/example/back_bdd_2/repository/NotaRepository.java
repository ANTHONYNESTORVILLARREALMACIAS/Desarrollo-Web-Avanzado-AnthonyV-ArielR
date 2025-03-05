package com.example.back_bdd_2.repository;



import com.example.back_bdd_2.model.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotaRepository extends JpaRepository<Nota, Long> {
}
