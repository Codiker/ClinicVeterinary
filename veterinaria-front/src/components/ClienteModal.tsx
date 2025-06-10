import React, { useEffect, useState } from 'react';
import styles from './ClienteModal.module.css';
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../api/clienteApi';

interface Cliente {
  id: number;
  nombre: string;
  identificacion: string;
  telefono: string;
  ciudad: string;
  direccion: string;
  tipoDocumento: string;
}

interface ClienteModalProps {
  show: boolean;
  onClose: () => void;
  onSelect: (cliente: Cliente) => void;
}

const initialForm: Omit<Cliente, 'id'> = {
  nombre: '',
  identificacion: '',
  telefono: '',
  ciudad: '',
  direccion: '',
  tipoDocumento: '',
};

const ClienteModal: React.FC<ClienteModalProps> = ({ show, onClose, onSelect }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) fetchClientes();
  }, [show]);

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const data = await getClientes();
      setClientes(data);
    } catch {
      setError('Error al cargar clientes');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
    !form.tipoDocumento.trim() ||
    !form.identificacion.trim() ||
    !form.nombre.trim() ||
    !form.telefono.trim() ||
    !form.ciudad.trim() ||
    !form.direccion.trim()
  ) {
    setError('Todos los campos son obligatorios');
    return;
  }
    setError('');
    try {
      if (editId) {
        await updateCliente(editId, form);
      } else {
        await createCliente(form);
      }
      setForm(initialForm);
      setEditId(null);
      fetchClientes();
    } catch {
      setError('Error al guardar cliente');
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setForm(cliente);
    setEditId(cliente.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar este cliente?')) {
      try {
        await deleteCliente(id);
        fetchClientes();
      } catch {
        setError('Error al eliminar cliente');
      }
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Clientes</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
          <input name="tipoDocumento" placeholder="Tipo de Documento" value={form.tipoDocumento} onChange={handleChange} required />
          <input name="identificacion" placeholder="Identificación" value={form.identificacion} onChange={handleChange} required />
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
          <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required />
          <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
          <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
          {editId && <button type="button" onClick={() => { setForm(initialForm); setEditId(null); }}>Cancelar</button>}
        </form>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.identificacion}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.ciudad}</td>
                  <td>
                    <button onClick={() => onSelect(cliente)}>Seleccionar</button>
                    <button onClick={() => handleEdit(cliente)}>Editar</button>
                    <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={onClose} style={{ marginTop: 16 }}>Cerrar</button>
      </div>
    </div>
  );
};

export default ClienteModal;