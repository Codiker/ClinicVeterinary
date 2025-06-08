package com.veterinaria.veterinaria_back.infrastructure.persistence.entity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "paciente")
public class PacienteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;
    private String especie;
    private String raza;
    private LocalDate fechaNacimiento;
    private LocalDate fechaRegistro;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private ClienteEntity cliente;


    public PacienteEntity() {
    }

    public PacienteEntity(int id, String nombre, String especie, String raza, LocalDate fechaNacimiento, LocalDate fechaRegistro, ClienteEntity clienteID) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.fechaNacimiento = fechaNacimiento;
        this.fechaRegistro = fechaRegistro;
        this.cliente = cliente;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public ClienteEntity getCliente() { return cliente; }

    public void setCliente(ClienteEntity cliente) { this.cliente = cliente; }

}
