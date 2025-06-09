package com.veterinaria.veterinaria_back.application.service;

import com.veterinaria.veterinaria_back.domain.model.Paciente;
import com.veterinaria.veterinaria_back.domain.port.out.ClienteRepository;
import com.veterinaria.veterinaria_back.domain.port.out.PacienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PacienteService {
    private final PacienteRepository pacienteRepository;
    private final ClienteRepository clienteRepository;

    public PacienteService(PacienteRepository pacienteRepository, ClienteRepository clienteRepository) {
        this.pacienteRepository = pacienteRepository;
        this.clienteRepository = clienteRepository;
    }

    public Paciente crearPaciente(Paciente paciente) {
        if (!clienteRepository.existsById(paciente.getClienteId())) {
            throw new ClienteNotFoundException(paciente.getClienteId());
        }

        return pacienteRepository.save(paciente);
    }

    public Optional<Paciente> obtenerPorId(int id) {
        return pacienteRepository.findById(id);
    }

    public List<Paciente> listarPacientes() {
        return pacienteRepository.findAll();
    }

    public void eliminarPaciente(int id) {
        pacienteRepository.deleteById(id);
    }

    public Paciente actualizarPaciente(int id, Paciente paciente) {
        if (!pacienteRepository.findById(id).isPresent()) {
            throw new RuntimeException("Paciente no encontrado con ID: " + id);
        }

        if (!clienteRepository.existsById(paciente.getClienteId())) {
            throw new ClienteNotFoundException(paciente.getClienteId());
        }

        paciente.setId(id);
        return pacienteRepository.save(paciente);
    }
}
