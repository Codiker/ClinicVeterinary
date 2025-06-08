package com.veterinaria.veterinaria_back.infrastructure.persistence.mapper;

import com.veterinaria.veterinaria_back.domain.model.Paciente;
import com.veterinaria.veterinaria_back.infrastructure.persistence.entity.ClienteEntity;
import com.veterinaria.veterinaria_back.infrastructure.persistence.entity.PacienteEntity;

public class PacienteMapper {

    public static Paciente toDomain(PacienteEntity entity) {
        if (entity == null) return null;

        return new Paciente(
                entity.getId(),
                entity.getNombre(),
                entity.getEspecie(),
                entity.getRaza(),
                entity.getFechaNacimiento(),
                entity.getFechaRegistro(),
                entity.getCliente() != null ? entity.getCliente().getId() : null
        );
    }

    public static PacienteEntity toEntity(Paciente paciente) {
        if (paciente == null) return null;

        PacienteEntity entity = new PacienteEntity();
        entity.setId(paciente.getId());
        entity.setNombre(paciente.getNombre());
        entity.setEspecie(paciente.getEspecie());
        entity.setRaza(paciente.getRaza());
        entity.setFechaNacimiento(paciente.getFechaNacimiento());
        entity.setFechaRegistro(paciente.getFechaRegistro());

        ClienteEntity clienteEntity = new ClienteEntity();
        clienteEntity.setId(paciente.getClienteId());
        entity.setCliente(clienteEntity);

        return entity;
    }
}
