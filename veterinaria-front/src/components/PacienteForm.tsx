import React, { useState, useEffect } from 'react';

const initialState = {
  nombre: '',
  especie: '',
  raza: '',
  fechaNacimiento: '',
  clienteId: ''
};

const PacienteForm = ({ onSubmit, pacienteEdit, onCancel }: any) => {
  const [paciente, setPaciente] = useState(initialState);

  useEffect(() => {
    if (pacienteEdit) {
      setPaciente({
        ...pacienteEdit,
        fechaNacimiento: pacienteEdit.fechaNacimiento ? pacienteEdit.fechaNacimiento.substring(0, 10) : '',
        clienteId: pacienteEdit.clienteId?.toString() || ''
      });
    } else {
      setPaciente(initialState);
    }
  }, [pacienteEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...paciente,
      clienteId: Number(paciente.clienteId),
      fechaNacimiento: paciente.fechaNacimiento
    });
    setPaciente(initialState);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
      <input name="nombre" value={paciente.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="especie" value={paciente.especie} onChange={handleChange} placeholder="Especie" required />
      <input name="raza" value={paciente.raza} onChange={handleChange} placeholder="Raza" required />
      <input name="fechaNacimiento" type="date" value={paciente.fechaNacimiento} onChange={handleChange} placeholder="Fecha de Nacimiento" required />
      <input name="clienteId" type="number" value={paciente.clienteId} onChange={handleChange} placeholder="ID Cliente" required />
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">{pacienteEdit ? 'Actualizar' : 'Agregar'}</button>
        {pacienteEdit && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default PacienteForm;
