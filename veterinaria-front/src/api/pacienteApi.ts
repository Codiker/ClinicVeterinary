import { getToken } from '../utils/authUtils';

const API_URL = '/api/pacientes';

export const getPacientes = async () => {
  const token = getToken();
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const createPaciente = async (paciente: any) => {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(paciente)
  });
  return res.json();
};

export const updatePaciente = async (id: number, paciente: any) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(paciente)
  });
  return res.json();
};

export const deletePaciente = async (id: number) => {
  const token = getToken();
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};