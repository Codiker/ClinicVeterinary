package com.veterinaria.veterinaria_back.infrastructure.persistence.adapter;

import com.veterinaria.veterinaria_back.domain.model.Cliente;
import com.veterinaria.veterinaria_back.domain.port.out.ClienteRepository;
import com.veterinaria.veterinaria_back.infrastructure.persistence.entity.ClienteEntity;
import com.veterinaria.veterinaria_back.infrastructure.persistence.mapper.ClienteMapper;
import com.veterinaria.veterinaria_back.infrastructure.persistence.repository.ClienteJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class ClienteRepositoryAdapter implements ClienteRepository {

    private final ClienteJpaRepository clienteJpaRepository;

    public ClienteRepositoryAdapter(ClienteJpaRepository clienteJpaRepository) {
        this.clienteJpaRepository = clienteJpaRepository;
    }

    @Override
    public Cliente save(Cliente cliente) {
        ClienteEntity entity = ClienteMapper.toEntity(cliente);
        ClienteEntity savedEntity = clienteJpaRepository.save(entity);
        return ClienteMapper.toDomain(savedEntity);
    }

    @Override
    public Optional<Cliente> findById(int id) {
        return clienteJpaRepository.findById(id)
                .map(ClienteMapper::toDomain);
    }

    @Override
    public Optional<Cliente> findByIdentificacion(String identificacion) {
        return clienteJpaRepository.findByIdentificacion(identificacion)
                .map(ClienteMapper::toDomain);
    }

    @Override
    public List<Cliente> findAll() {
        return clienteJpaRepository.findAll()
                .stream()
                .map(ClienteMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(int id) {
        clienteJpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(int id) {
        return clienteJpaRepository.existsById(id);
    }
}
