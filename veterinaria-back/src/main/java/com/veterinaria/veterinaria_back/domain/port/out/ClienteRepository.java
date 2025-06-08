package com.veterinaria.veterinaria_back.domain.port.out;

import com.veterinaria.veterinaria_back.domain.model.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository {
    Cliente save(Cliente cliente);
    Optional<Cliente> findById(int id);
    Optional<Cliente> findByIdentificacion(String identificacion);
    List<Cliente> findAll();
    void deleteById(int id);
    boolean existsById(int id);
}
