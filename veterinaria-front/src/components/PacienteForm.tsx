import React, { useState, useEffect } from 'react';
import ClienteModal from './ClienteModal';

interface PacienteFormProps {
  onSubmit: (paciente: any) => void;
  pacienteEdit?: any;
  onCancel: () => void;
}

const initialState = {
  id: 0, 
  nombre: '',
  especie: '',
  raza: '',
  fechaNacimiento: '',
   fechaRegistro: new Date().toISOString().split('T')[0],
  clienteId: ''
};

const PacienteForm: React.FC<PacienteFormProps> = ({ onSubmit, pacienteEdit, onCancel }) => {
  const [paciente, setPaciente] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClienteModal, setShowClienteModal] = useState(false);

useEffect(() => {
  if (pacienteEdit) {
    setPaciente({
      id: pacienteEdit.id, // Asegurarse de incluir el ID
      nombre: pacienteEdit.nombre,
      especie: pacienteEdit.especie,
      raza: pacienteEdit.raza,
      fechaNacimiento: pacienteEdit.fechaNacimiento.split('T')[0],
      fechaRegistro: pacienteEdit.fechaRegistro,
      clienteId: pacienteEdit.clienteId.toString()
    });
    setErrors({}); // Limpiar errores al cargar datos de edición
  } else {
    setPaciente(initialState);
  }
}, [pacienteEdit]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!paciente.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (paciente.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!paciente.especie.trim()) {
      newErrors.especie = 'La especie es requerida';
    }
    
    if (!paciente.raza.trim()) {
      newErrors.raza = 'La raza es requerida';
    }
    
    if (!paciente.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(paciente.fechaNacimiento);
      const today = new Date();
      if (birthDate > today) {
        newErrors.fechaNacimiento = 'La fecha de nacimiento no puede ser futura';
      }
    }
    
    if (!paciente.clienteId) {
      newErrors.clienteId = 'El ID de cliente es requerido';
    } else if (isNaN(Number(paciente.clienteId)) || Number(paciente.clienteId) <= 0) {
      newErrors.clienteId = 'El ID de cliente debe ser un número positivo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const pacienteToSubmit = {
        ...(pacienteEdit?.id ? { id: Number(pacienteEdit.id) } : {}),
        nombre: paciente.nombre,
        especie: paciente.especie,
        raza: paciente.raza,
        fechaNacimiento: paciente.fechaNacimiento,
        fechaRegistro: pacienteEdit?.fechaRegistro || new Date().toISOString().split('T')[0],
        clienteId: Number(paciente.clienteId)
      };

      await onSubmit(pacienteToSubmit);
      
      if (!pacienteEdit) {
        setPaciente(initialState);
        setErrors({});
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Error al guardar el paciente. Por favor, intente nuevamente.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const especies = [
    'Perro', 'Gato', 'Conejo', 'Hámster', 'Ave', 'Reptil', 'Pez', 'Otro'
  ];

  const getRazasPorEspecie = (especie: string) => {
    const razas: Record<string, string[]> = {
      'Perro': ['Labrador', 'Golden Retriever', 'Pastor Alemán', 'Bulldog', 'Chihuahua', 'Mestizo', 'Otro'],
      'Gato': ['Persa', 'Siamés', 'Maine Coon', 'Británico', 'Bengalí', 'Mestizo', 'Otro'],
      'Conejo': ['Holandés', 'Angora', 'Belier', 'Rex', 'Otro'],
      'Ave': ['Canario', 'Periquito', 'Loro', 'Cacatúa', 'Otro'],
      'Reptil': ['Iguana', 'Gecko', 'Tortuga', 'Serpiente', 'Otro'],
      'Pez': ['Goldfish', 'Betta', 'Guppy', 'Otro'],
      'Hámster': ['Sirio', 'Enano', 'Roborovski', 'Otro'],
      'Otro': ['Otro']
    };
    return razas[especie] || ['Otro'];
  };

  return (
    <div className="form-container">
      <div className="section-title">
        <span style={{ fontSize: '2rem' }}>
          {pacienteEdit ? '✏️' : '🐾'}
        </span>
        {pacienteEdit ? 'Editar Paciente' : 'Registrar Nuevo Paciente'}
      </div>
      
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label className="form-label">
            <span style={{ marginRight: '0.5rem' }}>🏷️</span>
            Nombre del Paciente
          </label>
          <input
            className={`form-input ${errors.nombre ? 'input-error' : ''}`}
            name="nombre"
            value={paciente.nombre}
            onChange={handleChange}
            placeholder="Ej: Max, Luna, Firulais..."
            disabled={isSubmitting}
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            <span style={{ marginRight: '0.5rem' }}>🦴</span>
            Especie
          </label>
          <select
            className={`form-input ${errors.especie ? 'input-error' : ''}`}
            name="especie"
            value={paciente.especie}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">Seleccionar especie...</option>
            {especies.map(especie => (
              <option key={especie} value={especie}>{especie}</option>
            ))}
          </select>
          {errors.especie && <span className="error-message">{errors.especie}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            <span style={{ marginRight: '0.5rem' }}>🐕</span>
            Raza
          </label>
          <select
            className={`form-input ${errors.raza ? 'input-error' : ''}`}
            name="raza"
            value={paciente.raza}
            onChange={handleChange}
            disabled={isSubmitting || !paciente.especie}
          >
            <option value="">
              {paciente.especie ? 'Seleccionar raza...' : 'Primero selecciona una especie'}
            </option>
            {paciente.especie && getRazasPorEspecie(paciente.especie).map(raza => (
              <option key={raza} value={raza}>{raza}</option>
            ))}
          </select>
          {errors.raza && <span className="error-message">{errors.raza}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            <span style={{ marginRight: '0.5rem' }}>📅</span>
            Fecha de Nacimiento
          </label>
          <input
            className={`form-input ${errors.fechaNacimiento ? 'input-error' : ''}`}
            name="fechaNacimiento"
            type="date"
            value={paciente.fechaNacimiento}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            disabled={isSubmitting}
          />
          {errors.fechaNacimiento && <span className="error-message">{errors.fechaNacimiento}</span>}
        </div>

        <div className="form-group">
          <label>ID del Cliente</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              name="clienteId"
              type="number"
              value={paciente.clienteId}
              onChange={handleChange}
              placeholder="Ej: 12345"
              min="1"
              disabled={isSubmitting}
            />
            <button 
              type="button" 
              onClick={() => setShowClienteModal(true)}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Buscar/Crear Cliente
            </button>
          </div>
          {errors.clienteId && <span className="error-message">{errors.clienteId}</span>}
        </div>

        <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
          {pacienteEdit && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <span>❌</span>
              Cancelar
            </button>
          )}
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>⏳</span>
                Guardando...
              </>
            ) : (
              <>
                <span>{pacienteEdit ? '💾' : '➕'}</span>
                {pacienteEdit ? 'Actualizar Paciente' : 'Registrar Paciente'}
              </>
            )}
          </button>
        </div>
      </form>

      <ClienteModal
        show={showClienteModal}
        onClose={() => setShowClienteModal(false)}
        onSelect={cliente => {
          setPaciente({ ...paciente, clienteId: String(cliente.id) });
          setShowClienteModal(false);
        }}
      />
    </div>
  );
};

export default PacienteForm;
