// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Cambiado de useHistory a useNavigate
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios'; // Importamos axios directamente
// import styles from './Login.module.css';

// interface Credentials {
//   username: string;
//   password: string;
// }

// const Login = () => {
//     const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const { login } = useAuth();
//     const navigate = useNavigate(); // Actualizado a useNavigate

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//         setError('');
//     };

//     const validateForm = (): boolean => {
//         if (!credentials.username.trim()) {
//             setError('El nombre de usuario es requerido');
//             return false;
//         }
//         if (!credentials.password.trim()) {
//             setError('La contraseña es requerida');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
        
//         if (!validateForm()) return;

//         try {
//             setIsLoading(true);
//             setError('');
            
//             const response = await login(credentials);
            
//             if (response.success) {
//                 navigate('/pacientes'); // Usando navigate en lugar de window.location
//             } else {
//                 setError('Credenciales incorrectas');
//             }
//         } catch (err) {
//             setError('Error al conectar con el servidor. Intente más tarde.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//   return (
//     <div className={styles.loginContainer}>
//       <form className={styles.loginForm} onSubmit={handleSubmit}>
//         <h2 className={styles.title}>Iniciar sesión</h2>
        
//         <div className={styles.inputGroup}>
//           <input
//             className={styles.input}
//             name="username"
//             placeholder="Usuario"
//             value={credentials.username}
//             onChange={handleChange}
//             autoComplete="username"
//             disabled={isLoading}
//             required
//           />
//         </div>
        
//         <div className={styles.inputGroup}>
//           <input
//             className={styles.input}
//             name="password"
//             type="password"
//             placeholder="Contraseña"
//             value={credentials.password}
//             onChange={handleChange}
//             autoComplete="current-password"
//             disabled={isLoading}
//             required
//           />
//         </div>

//         <button 
//           className={styles.button} 
//           type="submit"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
//         </button>

//         {error && <p className={styles.error}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

interface Credentials {
  username: string;
  password: string;
}

const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = (): boolean => {
    if (!credentials.username.trim()) {
      setError('El nombre de usuario es requerido');
      return false;
    }
    if (!credentials.password.trim()) {
      setError('La contraseña es requerida');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError('');
      
      const response = await login(credentials);
      
      if (response.success) {
        navigate('/pacientes');
      } else {
        setError('Credenciales incorrectas. Por favor, intente nuevamente.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Intente más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Iconos decorativos de patitas */}
        <span className={`${styles.pawIcon} ${styles.paw1}`}>🐾</span>
        <span className={`${styles.pawIcon} ${styles.paw2}`}>🐾</span>
        
        <div className={styles.logoContainer}>
          <img src="/paw-icon.svg" alt="Logo Clínica Veterinaria" className={styles.logo} />
          <h1 className={styles.title}>Cisco Clinical Veterinaria</h1>
          <p className={styles.subtitle}>Sistema de gestión de pacientes</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Usuario</label>
            <input
              id="username"
              className={styles.input}
              name="username"
              placeholder="Ingrese su usuario"
              value={credentials.username}
              onChange={handleChange}
              autoComplete="username"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              id="password"
              className={styles.input}
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
          </div>

          <button 
            className={styles.button} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.loadingSpinner}></span>
                Iniciando sesión...
              </>
            ) : 'Iniciar sesión'}
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>

        <div className={styles.footer}>
          <p>© {new Date().getFullYear()} Cisco Clinical Veterinaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;