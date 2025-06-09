import React, { useEffect, useState, useMemo } from "react";
import "../App.css";
import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../api/pacienteApi";
import PacienteForm from "./PacienteForm";

interface Paciente {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  fechaNacimiento: string;
  clienteId: number;
}

const PacientesCRUD = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [editPaciente, setEditPaciente] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEspecie, setFilterEspecie] = useState("");
  const [sortBy, setSortBy] = useState<
    "nombre" | "especie" | "fechaNacimiento"
  >("nombre");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showForm, setShowForm] = useState(false);

  const fetchPacientes = async () => {
    try {
      setLoading(true);
      const data = await getPacientes();
      setPacientes(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los pacientes. Por favor intenta nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleAdd = async (paciente: any) => {
    try {
      const response = await createPaciente(paciente);
      if (response) {
        await fetchPacientes();
        setShowForm(false);
        // Opcional: Mostrar mensaje de éxito
        setError(null);
      }
    } catch (err) {
      console.error("Error al agregar paciente:", err);
      if (err instanceof Error) {
        if (err.message.includes("403")) {
          setError("Sesión expirada. Por favor, inicie sesión nuevamente.");
        } else if (err.message.includes("Cliente no encontrado")) {
          setError("El ID de cliente proporcionado no existe.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Error desconocido al agregar el paciente.");
      }
    }
  };

  const handleUpdate = async (paciente: any) => {
    try {
      setError(null);
      await updatePaciente(paciente.id, paciente);
      await fetchPacientes();
      setEditPaciente(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error al actualizar paciente:", err);
      if (err instanceof Error) {
        if (err.message.includes("403")) {
          setError("Sesión expirada. Por favor, inicie sesión nuevamente.");
        } else {
          setError(`Error al actualizar el paciente: ${err.message}`);
        }
      } else {
        setError("Error desconocido al actualizar el paciente.");
      }
    }
  };

  const handleDelete = async (id: number, nombre: string) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar a "${nombre}"? Esta acción no se puede deshacer.`
      )
    ) {
      try {
        await deletePaciente(id);
        fetchPacientes();
      } catch (err) {
        console.error(err);
        setError("Error al eliminar el paciente.");
      }
    }
  };

  const handleEdit = (paciente: Paciente) => {
    // Formatea la fecha antes de enviarla al formulario
    const pacienteFormateado = {
      ...paciente,
      fechaNacimiento: paciente.fechaNacimiento.split("T")[0], // Asegura formato YYYY-MM-DD
    };

    setEditPaciente(pacienteFormateado);
    setShowForm(true);
    setError(null); // Limpia cualquier error previo
  };

  const handleCancel = () => {
    setEditPaciente(null);
    setShowForm(false);
  };

  const handleNewPaciente = () => {
    setEditPaciente(null);
    setShowForm(true);
  };

  // Filtrado y ordenamiento
  const filteredAndSortedPacientes = useMemo(() => {
    let filtered = pacientes.filter((paciente) => {
      const matchesSearch =
        paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.raza.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.clienteId.toString().includes(searchTerm);
      const matchesEspecie =
        filterEspecie === "" || paciente.especie === filterEspecie;
      return matchesSearch && matchesEspecie;
    });

    return filtered.sort((a, b) => {
      let aValue: string | number = a[sortBy];
      let bValue: string | number = b[sortBy];

      if (sortBy === "fechaNacimiento") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [pacientes, searchTerm, filterEspecie, sortBy, sortOrder]);

  const getUniqueEspecies = () => {
    return [...new Set(pacientes.map((p) => p.especie))].sort();
  };

  const getEdadEnMeses = (fechaNacimiento: string) => {
    const birth = new Date(fechaNacimiento);
    const now = new Date();
    const months =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth());
    return months;
  };

  const getEspecieIcon = (especie: string) => {
    const icons: Record<string, string> = {
      Perro: "🐕",
      Gato: "🐱",
      Conejo: "🐰",
      Hámster: "🐹",
      Ave: "🦜",
      Reptil: "🦎",
      Pez: "🐠",
      Otro: "🐾",
    };
    return icons[especie] || "🐾";
  };

  return (
    <div className="main-content">
      {/* Header con estadísticas */}
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "2.5rem",
                color: "var(--gray-900)",
              }}
            >
              🏥 Gestión de Pacientes Veterinarios
            </h1>
            <p
              style={{
                margin: "0.5rem 0 0 0",
                color: "var(--gray-600)",
                fontSize: "1.1rem",
              }}
            >
              {pacientes.length} pacientes registrados
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleNewPaciente}
            style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}
          >
            <span>➕</span>
            Nuevo Paciente
          </button>
        </div>

        {/* Estadísticas rápidas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {getUniqueEspecies().map((especie) => {
            const count = pacientes.filter((p) => p.especie === especie).length;
            return (
              <div
                key={especie}
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-50), var(--primary-100))",
                  padding: "1rem",
                  borderRadius: "var(--border-radius-lg)",
                  textAlign: "center",
                  border: "1px solid var(--primary-200)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  {getEspecieIcon(especie)}
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "var(--primary-700)",
                  }}
                >
                  {count}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--gray-600)",
                    textTransform: "uppercase",
                  }}
                >
                  {especie}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Formulario (condicional) */}
      {showForm && (
        <div className="card">
          <PacienteForm
            onSubmit={editPaciente ? handleUpdate : handleAdd}
            pacienteEdit={editPaciente}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Filtros y búsqueda */}
      <div className="card">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div className="form-group">
            <label className="form-label">
              <span style={{ marginRight: "0.5rem" }}>🔍</span>
              Buscar pacientes
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="Buscar por nombre, raza o ID cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span style={{ marginRight: "0.5rem" }}>🦴</span>
              Filtrar por especie
            </label>
            <select
              className="form-input"
              value={filterEspecie}
              onChange={(e) => setFilterEspecie(e.target.value)}
            >
              <option value="">Todas las especies</option>
              {getUniqueEspecies().map((especie) => (
                <option key={especie} value={especie}>
                  {getEspecieIcon(especie)} {especie}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span style={{ marginRight: "0.5rem" }}>📊</span>
              Ordenar por
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <select
                className="form-input"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "nombre" | "especie" | "fechaNacimiento"
                  )
                }
                style={{ flex: 1 }}
              >
                <option value="nombre">Nombre</option>
                <option value="especie">Especie</option>
                <option value="fechaNacimiento">Edad</option>
              </select>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                style={{ minWidth: "auto", padding: "0.5rem" }}
              >
                {sortOrder === "asc" ? "⬆️" : "⬇️"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de pacientes */}
      <div className="card">
        <h2 className="section-title">
          <span>📋</span>
          Lista de Pacientes
          {filteredAndSortedPacientes.length !== pacientes.length && (
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "normal",
                color: "var(--gray-600)",
                marginLeft: "1rem",
              }}
            >
              ({filteredAndSortedPacientes.length} de {pacientes.length})
            </span>
          )}
        </h2>

        {error && (
          <div className="alert alert-danger">
            <span>⚠️</span>
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <span>Cargando pacientes...</span>
          </div>
        ) : filteredAndSortedPacientes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              {searchTerm || filterEspecie ? "🔍" : "🐾"}
            </div>
            <p>
              {searchTerm || filterEspecie
                ? "No se encontraron pacientes con los filtros aplicados"
                : "No hay pacientes registrados"}
            </p>
            {(searchTerm || filterEspecie) && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm("");
                  setFilterEspecie("");
                }}
              >
                <span>🔄</span>
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Especie</th>
                  <th>Raza</th>
                  <th>Edad</th>
                  <th>Cliente</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedPacientes.map((p) => {
                  const edadMeses = getEdadEnMeses(p.fechaNacimiento);
                  const edadTexto =
                    edadMeses < 12
                      ? `${edadMeses} meses`
                      : `${Math.floor(edadMeses / 12)} años`;

                  return (
                    <tr key={p.id}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1.5rem",
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              background: "var(--primary-100)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {getEspecieIcon(p.especie)}
                          </div>
                          <div>
                            <div
                              style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                            >
                              {p.nombre}
                            </div>
                            <div
                              style={{
                                fontSize: "0.85rem",
                                color: "var(--gray-500)",
                              }}
                            >
                              ID: {p.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-primary">{p.especie}</span>
                      </td>
                      <td style={{ color: "var(--gray-700)" }}>{p.raza}</td>
                      <td>
                        <div>
                          <div style={{ fontWeight: "500" }}>{edadTexto}</div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--gray-500)",
                            }}
                          >
                            {new Date(p.fechaNacimiento).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            padding: "0.25rem 0.5rem",
                            background: "var(--gray-100)",
                            borderRadius: "var(--border-radius)",
                            display: "inline-block",
                            fontFamily: "monospace",
                            fontSize: "0.9rem",
                          }}
                        >
                          #{p.clienteId}
                        </div>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEdit(p)}
                            title="Editar paciente"
                          >
                            <span>✏️</span>
                            Editar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(p.id, p.nombre)}
                            title="Eliminar paciente"
                          >
                            <span>🗑️</span>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PacientesCRUD;
