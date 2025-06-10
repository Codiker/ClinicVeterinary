import { getToken } from '../utils/authUtils';

const API_URL = '/api/clientes';

export const getClientes = async () => {
  const token = getToken();
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const getClienteById = async (id: number) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Cliente no encontrado');
  return res.json();
};

export const createCliente = async (cliente: any) => {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(cliente)
  });
  if (!res.ok) throw new Error('Error al crear cliente');
  return res.json();
};

export const updateCliente = async (id: number, cliente: any) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(cliente)
  });
  if (!res.ok) throw new Error('Error al actualizar cliente');
  return res.json();
};

export const deleteCliente = async (id: number) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al eliminar cliente');
  return true;
};