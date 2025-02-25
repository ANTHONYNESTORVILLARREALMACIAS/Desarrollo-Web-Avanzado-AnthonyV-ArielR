package com.example.Ejemplo_DTO.service;

import com.example.Ejemplo_DTO.dto.SeguroDTO;
import com.example.Ejemplo_DTO.model.Automovil;
import com.example.Ejemplo_DTO.model.Seguro;
import com.example.Ejemplo_DTO.repository.AutomovilRepository;
import com.example.Ejemplo_DTO.repository.SeguroRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeguroService {
    private final SeguroRepository seguroRepository;
    private final AutomovilRepository automovilRepository;

    public SeguroService(SeguroRepository seguroRepository, AutomovilRepository automovilRepository) {
        this.seguroRepository = seguroRepository;
        this.automovilRepository = automovilRepository;
    }

    /**
     * Método para generar un seguro para un automóvil específico
     */
    public SeguroDTO generarSeguro(Long automovilId) {
        Automovil automovil = automovilRepository.findById(automovilId)
                .orElseThrow(() -> new RuntimeException("Automóvil no encontrado"));

        if (automovil.getSeguro() != null) {
            throw new RuntimeException("El automóvil ya tiene un seguro");
        }

        double costoTotal = calcularSeguro(automovil);
        Seguro seguro = new Seguro(costoTotal, automovil);
        seguro = seguroRepository.save(seguro);

        // Actualizar la relación en Automovil
        automovil.setSeguro(seguro);
        automovilRepository.save(automovil);

        return new SeguroDTO(seguro.getId(),
                seguro.getCostoTotal(),
                automovil.getId(),
                automovil.getModelo(),
                automovil.getPropietario().getNombre()+ " " + automovil.getPropietario().getApellido());
    }

    /**
     * Crear un nuevo seguro
     */
    public SeguroDTO crear(SeguroDTO seguroDTO) {
        Automovil automovil = automovilRepository.findById(seguroDTO.getAutomovilId())
                .orElseThrow(() -> new RuntimeException("Automóvil no encontrado"));

        Seguro seguro = new Seguro(seguroDTO.getCostoTotal(), automovil);
        seguroRepository.save(seguro);

        return new SeguroDTO(seguro.getId(),
                seguro.getCostoTotal(),
                automovil.getId(),
                automovil.getModelo(),
                automovil.getPropietario().getNombre() + " " + automovil.getPropietario().getApellido());
    }

    /**
     * Modificar un seguro existente
     */
    public SeguroDTO modificar(Long id, SeguroDTO seguroDTO) {
        Seguro seguro = seguroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seguro no encontrado"));

        Automovil automovil = automovilRepository.findById(seguroDTO.getAutomovilId())
                .orElseThrow(() -> new RuntimeException("Automóvil no encontrado"));

        // Recalcular el costo total basado en el automóvil
        double nuevoCosto = calcularCostoSeguro(automovil);
        seguro.setCostoTotal(nuevoCosto);
        seguro.setAutomovil(automovil);

        Seguro seguroActualizado = seguroRepository.save(seguro);

        return new SeguroDTO(
                seguroActualizado.getId(),
                seguroActualizado.getCostoTotal(),
                automovil.getId(),
                automovil.getModelo(),
                automovil.getPropietario().getNombre() + " " + automovil.getPropietario().getApellido()
        );
    }

    /**
     * Método auxiliar para calcular el costo del seguro basado en el automóvil
     */
    private double calcularCostoSeguro(Automovil automovil) {
        // Ejemplo de lógica: costo base + ajuste por valor y accidentes
        double costoBase = 500.0; // Costo base fijo (ajústalo según tu lógica)
        double valorAutomovil = automovil.getValor(); // Asumiendo que Automovil tiene un campo "valor"
        int numeroAccidentes = automovil.getAccidentes(); // Asumiendo que Automovil tiene un campo "numeroAccidentes"

        double ajustePorValor = valorAutomovil * 0.05; // 5% del valor del automóvil
        double ajustePorAccidentes = numeroAccidentes * 100.0; // $100 por accidente

        return costoBase + ajustePorValor + ajustePorAccidentes;
    }

    /**
     * Eliminar un seguro por ID
     */
    @Transactional
    public void eliminar(Long id) {
        Seguro seguro = seguroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seguro no encontrado"));

        // 1. Obtener el automóvil asociado al seguro
        Automovil automovil = seguro.getAutomovil();

        // 2. Desvincular el seguro del automóvil
        automovil.removerSeguro();

        // 3. Guardar el automóvil actualizado
        automovilRepository.save(automovil);

        // 4. Eliminar el seguro
        seguroRepository.delete(seguro);
    }

    /**
     * Obtener todos los seguros registrados en el sistema
     */
    public List<SeguroDTO> obtenerTodos() {
        return seguroRepository.findAll().stream()
                .map(seguro -> new SeguroDTO(
                        seguro.getId(),
                        seguro.getCostoTotal(),
                        seguro.getAutomovil().getId(),
                        seguro.getAutomovil().getModelo(), // Nuevo
                        seguro.getAutomovil().getPropietario().getNombre() + " " +
                                seguro.getAutomovil().getPropietario().getApellido() // Nuevo
                ))
                .collect(Collectors.toList());
    }

    /**
     * Obtener un seguro por su ID
     */
    public SeguroDTO obtenerPorId(Long id) {
        Seguro seguro = seguroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seguro no encontrado"));

        return new SeguroDTO(
                seguro.getId(),
                seguro.getCostoTotal(),
                seguro.getAutomovil().getId(),
                seguro.getAutomovil().getModelo(), // Nuevo
                seguro.getAutomovil().getPropietario().getNombre() + " " +
                        seguro.getAutomovil().getPropietario().getApellido() // Nuevo
        );
    }

    /**
     * Método para calcular el costo total del seguro basado en:
     * - Valor del automóvil
     * - Modelo del automóvil
     * - Edad del propietario
     * - Cantidad de accidentes
     */
    public double calcularSeguro(Automovil automovil) {
        if (automovil == null) {
            throw new IllegalArgumentException("El automóvil no puede ser nulo.");
        }

        double valorAuto = automovil.getValor();
        int edad = automovil.getPropietario().getEdad();
        int accidentes = automovil.getAccidentes();
        String modelo = automovil.getModelo();

        // Costo base del seguro
        double costo = valorAuto * 0.035;

        // Ajustes según modelo, edad y accidentes
        costo += obtenerCargoModelo(modelo, valorAuto);
        costo += obtenerCargoEdad(edad);
        costo += obtenerCargoAccidentes(accidentes, costo);

        return costo;
    }

    /**
     * Método para calcular el costo adicional según el modelo del automóvil
     */
    private double obtenerCargoModelo(String modelo, double valorAuto) {
        switch (modelo.toUpperCase()) {
            case "A":
                return valorAuto * 0.011;
            case "B":
                return valorAuto * 0.012;
            case "C":
                return valorAuto * 0.015;
            default:
                return 0;
        }
    }

    /**
     * Método para calcular el costo adicional según la edad del propietario
     */
    private double obtenerCargoEdad(int edad) {
        if (edad >= 18 && edad < 25) return 360;
        if (edad >= 25 && edad < 44) return 240;
        if (edad >= 44) return 130;
        throw new IllegalArgumentException("Edad fuera de rango. No aseguramos.");
    }

    /**
     * Método para calcular el costo adicional según la cantidad de accidentes
     */
    private double obtenerCargoAccidentes(int accidentes, double costoBase) {
        if (accidentes < 3) {
            return accidentes * (costoBase * 0.17);
        } else {
            return (3 * (costoBase * 0.17)) + ((accidentes - 3) * (costoBase * 0.21));
        }
    }
}
