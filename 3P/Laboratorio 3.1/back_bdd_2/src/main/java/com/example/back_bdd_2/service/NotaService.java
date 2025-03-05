package com.example.back_bdd_2.service;



import com.example.back_bdd_2.model.Estudiante;
import com.example.back_bdd_2.model.Nota;
import com.example.back_bdd_2.repository.NotaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NotaService {

    private final NotaRepository notaRepository;

    public NotaService(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    public List<Nota> obtenerTodas() {
        return notaRepository.findAll();
    }

    public Nota guardar(Nota nota) {
        return notaRepository.save(nota);
    }
    // ✅ Actualizar un estudiante por ID
    public Optional<Nota> actualizar(Long id, Nota notasDetalles) {
        return notaRepository.findById(id).map(notas -> {
            notas.setAsignatura(notasDetalles.getAsignatura());
            notas.setNota(notasDetalles.getNota());
            notas.setFechaRegistro(notasDetalles.getFechaRegistro());
            notas.setEstudiante(notasDetalles.getEstudiante());
            return notaRepository.save(notas);
        });
    }

    public void eliminar(Long id) {
        notaRepository.deleteById(id);
    }
}
