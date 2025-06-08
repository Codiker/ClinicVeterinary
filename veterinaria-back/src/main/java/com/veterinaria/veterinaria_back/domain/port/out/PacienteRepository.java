package com.veterinaria.veterinaria_back.domain.port.out;

import com.veterinaria.veterinaria_back.domain.model.Paciente;

import java.util.List;
import java.util.Optional;

public interface PacienteRepository {
    Paciente save(Paciente paciente);
    Optional<Paciente> findById(int id);
    List<Paciente> findAll();
    void deleteById(int id);
}
