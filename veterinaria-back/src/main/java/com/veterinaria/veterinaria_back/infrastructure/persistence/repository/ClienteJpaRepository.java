package com.veterinaria.veterinaria_back.infrastructure.persistence.repository;

import com.veterinaria.veterinaria_back.infrastructure.persistence.entity.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteJpaRepository extends JpaRepository<ClienteEntity, Integer> {
    Optional<ClienteEntity> findByIdentificacion(String identificacion);
}
