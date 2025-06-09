import React, { useEffect, useState } from "react";
import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../api/pacienteApi";
import PacienteForm from "./PacienteForm";

const PacientesCRUD = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [editPaciente, setEditPaciente] = useState<any>(null);

  const fetchPacientes = async () => {
    const data = await getPacientes();
    setPacientes(data);
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleAdd = async (paciente: any) => {
    await createPaciente(paciente);
    fetchPacientes();
  };

  const handleUpdate = async (paciente: any) => {
    await updatePaciente(paciente.id, paciente);
    setEditPaciente(null);
    fetchPacientes();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este paciente?")) {
      await deletePaciente(id);
      fetchPacientes();
    }
  };

  return (
    <div>
      <h2>{editPaciente ? "Editar Paciente" : "Agregar Paciente"}</h2>
      <PacienteForm
        onSubmit={editPaciente ? handleUpdate : handleAdd}
        pacienteEdit={editPaciente}
        onCancel={() => setEditPaciente(null)}
      />
      <hr style={{ margin: "32px 0" }} />
      <h2>Lista de Pacientes</h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}
      >
        <thead>
          <tr style={{ background: "#1976d2", color: "#fff" }}>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Fecha Nacimiento</th>
            <th>ID Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.especie}</td>
              <td>{p.raza}</td>
              <td>
                {p.fechaNacimiento
                  ? p.fechaNacimiento.substring(0, 10)
                  : ""}
              </td>
              <td>{p.clienteId}</td>
              <td>
                <button
                  className="action-btn edit"
                  onClick={() => setEditPaciente(p)}
                >
                  Editar
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacientesCRUD;
