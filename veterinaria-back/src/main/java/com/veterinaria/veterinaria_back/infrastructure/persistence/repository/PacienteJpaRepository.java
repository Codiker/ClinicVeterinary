package com.veterinaria.veterinaria_back.infrastructure.persistence.repository;

import com.veterinaria.veterinaria_back.infrastructure.persistence.entity.PacienteEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteJpaRepository extends JpaRepository<PacienteEntity, Integer> {
    List<PacienteEntity> findByClienteId(int clienteId);
}
