import { getToken } from '../utils/authUtils';
import axiosInstance from './axiosConfig';

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
  
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...paciente,
        fechaRegistro: new Date().toISOString().split('T')[0]
      })
    });

    if (!res.ok) {
      if (res.status === 403) {
        window.location.href = '/login';
        throw new Error('Sesión expirada');
      }
      
      if (res.status === 400) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error en los datos del paciente');
      }

      if (res.status === 404) {
        throw new Error('Cliente no encontrado');
      }

      throw new Error(`Error del servidor: ${res.status}`);
    }

    const text = await res.text();
    
    if (!text) {
      throw new Error('Respuesta vacía del servidor');
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('Error al parsear respuesta:', text);
      throw new Error('Respuesta inválida del servidor');
    }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al crear paciente: ${error.message}`);
    }
    throw new Error('Error desconocido al crear paciente');
  }
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