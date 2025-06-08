package com.veterinaria.veterinaria_back.infrastructure.persistence.mapper;

import com.veterinaria.veterinaria_back.domain.model.Cliente;
import com.veterinaria.veterinaria_back.infrastructure.persistence.entity.ClienteEntity;

public class ClienteMapper {

    public static Cliente toDomain(ClienteEntity entity) {
        if (entity == null) return null;

        return new Cliente(
                entity.getId(),
                entity.getTipoDocumento(),
                entity.getIdentificacion(),
                entity.getNombre(),
                entity.getTelefono(),
                entity.getCiudad(),
                entity.getDireccion()
        );
    }

    public static ClienteEntity toEntity(Cliente cliente) {
        if (cliente == null) return null;

        ClienteEntity entity = new ClienteEntity();
        entity.setId(cliente.getId());
        entity.setTipoDocumento(cliente.getTipoDocumento());
        entity.setIdentificacion(cliente.getIdentificacion());
        entity.setNombre(cliente.getNombre());
        entity.setTelefono(cliente.getTelefono());
        entity.setCiudad(cliente.getCiudad());
        entity.setDireccion(cliente.getDireccion());

        return entity;
    }
}
