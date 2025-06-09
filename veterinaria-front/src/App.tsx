import React from 'react';
import PacientesCRUD from './components/PacientesCRUD';
import Login from './components/Login';
import { getToken } from './utils/authUtils';
import './App.css';

function App() {
  const token = getToken();

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f8', padding: '40px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 32 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Gestión de Pacientes</h1>
        {!token ? <Login /> : <PacientesCRUD />}
      </div>
    </div>
  );
}

export default App;
