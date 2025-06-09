package com.veterinaria.veterinaria_back.infrastructure.controller;

import com.veterinaria.veterinaria_back.application.service.PacienteService;
import com.veterinaria.veterinaria_back.domain.model.Paciente;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {
    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @PostMapping
    public ResponseEntity<Paciente> crearPaciente(@RequestBody Paciente paciente) {
        Paciente creado = pacienteService.crearPaciente(paciente);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping
    public ResponseEntity<List<Paciente>> listarPacientes() {
        return ResponseEntity.ok(pacienteService.listarPacientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> obtenerPorId(@PathVariable int id) {
        return pacienteService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Paciente> actualizarPaciente(@PathVariable int id, @RequestBody Paciente paciente) {
        Paciente actualizado = pacienteService.actualizarPaciente(id, paciente);
        return ResponseEntity.ok(actualizado);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPaciente(@PathVariable int id) {
        pacienteService.eliminarPaciente(id);
        return ResponseEntity.noContent().build();
    }

}
