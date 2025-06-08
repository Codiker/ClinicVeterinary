package com.veterinaria.veterinaria_back.application.service;

public class ClienteNotFoundException extends RuntimeException {
    public ClienteNotFoundException(int id) {
        super("No se puede encontrar el cliente con el id: " + id);
    }

}
