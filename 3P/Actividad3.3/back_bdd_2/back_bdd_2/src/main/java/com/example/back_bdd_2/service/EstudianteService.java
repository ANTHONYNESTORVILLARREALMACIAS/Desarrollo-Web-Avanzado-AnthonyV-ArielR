package com.example.back_bdd_2.service;


import com.example.back_bdd_2.model.Estudiante;
import com.example.back_bdd_2.repository.EstudianteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {

    private final EstudianteRepository estudianteRepository;

    public EstudianteService(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    //

    public Optional<Estudiante> obtenerPorId(Long id) {
        return estudianteRepository.findById(id);
    }

    public List<Estudiante> obtenerTodos() {
        return estudianteRepository.findAll();
    }

    //
    public Optional<Estudiante> actualizar(Long id, Estudiante estudianteDetalles) {
        return estudianteRepository.findById(id).map(estudiante -> {
            estudiante.setNombre(estudianteDetalles.getNombre());
            estudiante.setApellido(estudianteDetalles.getApellido());
            estudiante.setEmail(estudianteDetalles.getEmail());
            estudiante.setFechaNacimiento(estudianteDetalles.getFechaNacimiento());
            return estudianteRepository.save(estudiante);
        });
    }

    public Estudiante guardar(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    public void eliminar(Long id) {
        estudianteRepository.deleteById(id);
    }

    public boolean existePorId(Long id) {
        return estudianteRepository.existsById(id);
    }


}
