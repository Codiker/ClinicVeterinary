package com.veterinaria.veterinaria_back.infrastructure.persistence.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class ClienteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "tipo_identificacion", nullable = false)
    @JsonProperty("tipoDocumento")
    private String tipoDocumento;

    @Column(name = "identificacion", unique = true)
    private String identificacion;
    @Column(name = "nombre_completo",nullable = false)
    @JsonProperty("nombreCompleto")
    private String nombre;
    private String telefono;
    private String ciudad;
    private String direccion;

    public ClienteEntity() {}

    public ClienteEntity(int id, String tipoDocumento, String identificacion, String nombre,
                         String telefono, String ciudad, String direccion) {
        this.id = id;
        this.tipoDocumento = tipoDocumento;
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.telefono = telefono;
        this.ciudad = ciudad;
        this.direccion = direccion;
    }

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getTipoDocumento() {return tipoDocumento;}
    public void setTipoDocumento(String tipoDocumento) {this.tipoDocumento = tipoDocumento;}

    public String getIdentificacion() {return identificacion;}
    public void setIdentificacion(String identificacion) {this.identificacion = identificacion;}

    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}

    public String getTelefono() {return telefono;}
    public void setTelefono(String telefono) {this.telefono = telefono;}

    public String getCiudad() {return ciudad;}
    public void setCiudad(String ciudad) {this.ciudad = ciudad;}

    public String getDireccion() {return direccion;}
    public void setDireccion(String direccion) {this.direccion = direccion;}
}
