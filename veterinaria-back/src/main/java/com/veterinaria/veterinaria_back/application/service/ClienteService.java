package com.veterinaria.veterinaria_back.application.service;

import com.veterinaria.veterinaria_back.domain.model.Cliente;
import com.veterinaria.veterinaria_back.domain.port.out.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente crearCliente(Cliente cliente) {
        //  agregar validaciones (lunes 9)

        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> obtenerPorId(int id) {
        return clienteRepository.findById(id);
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public Cliente actualizarCliente(Cliente cliente) {
        //  agregar validaciones para ver si el cliente existe (lunes 9)
        return clienteRepository.save(cliente);
    }

    public void eliminarCliente(int id) {
        clienteRepository.deleteById(id);
    }

    public boolean existeCliente(int id) {
        return clienteRepository.existsById(id);
    }
}
