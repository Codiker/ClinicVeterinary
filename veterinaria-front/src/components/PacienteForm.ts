import React, { useState } from 'react';
import { createPaciente } from '../api/pacienteApi';

const PacienteForm = () => {
    const [paciente, setPaciente] = useState({ nombre: '', especie: '', raza: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createPaciente(paciente);
        // Limpiar el formulario o manejar el estado
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nombre" onChange={handleChange} placeholder="Nombre" />
            <input name="especie" onChange={handleChange} placeholder="Especie" />
            <input name="raza" onChange={handleChange} placeholder="Raza" />
            <button type="submit">Guardar Paciente</button>
        </form>
    );
};

export default PacienteForm;
