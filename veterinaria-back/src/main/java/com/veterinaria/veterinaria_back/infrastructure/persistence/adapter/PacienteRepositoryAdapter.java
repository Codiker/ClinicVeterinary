package com.veterinaria.veterinaria_back.infrastructure.persistence.adapter;
import com.veterinaria.veterinaria_back.domain.model.Paciente;
import com.veterinaria.veterinaria_back.domain.port.out.PacienteRepository;
import com.veterinaria.veterinaria_back.infrastructure.persistence.entity.PacienteEntity;
import com.veterinaria.veterinaria_back.infrastructure.persistence.mapper.PacienteMapper;
import com.veterinaria.veterinaria_back.infrastructure.persistence.repository.ClienteJpaRepository;
import com.veterinaria.veterinaria_back.infrastructure.persistence.repository.PacienteJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class PacienteRepositoryAdapter implements PacienteRepository {
    private final PacienteJpaRepository pacienteJpaRepository;
    private final ClienteJpaRepository clienteJpaRepository;

    public PacienteRepositoryAdapter(PacienteJpaRepository pacienteJpaRepository, ClienteJpaRepository clienteJpaRepository) {
        this.pacienteJpaRepository = pacienteJpaRepository;
        this.clienteJpaRepository = clienteJpaRepository;
    }

    @Override
    public Paciente save(Paciente paciente) {
        PacienteEntity entity = PacienteMapper.toEntity(paciente);
        PacienteEntity savedEntity = pacienteJpaRepository.save(entity);
        return PacienteMapper.toDomain(savedEntity);
    }

    @Override
    public Optional<Paciente> findById(int id) {
        return pacienteJpaRepository.findById(id)
                .map(PacienteMapper::toDomain);
    }

    @Override
    public List<Paciente> findAll() {
        return pacienteJpaRepository.findAll()
                .stream()
                .map(PacienteMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(int id) {
        pacienteJpaRepository.deleteById(id);
    }
}