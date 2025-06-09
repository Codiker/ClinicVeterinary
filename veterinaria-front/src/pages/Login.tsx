import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api/authApi';
import { setToken } from '../utils/authUtils';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await login(credentials);
            if (token) {
                setAuth(token);
                setToken(token);
                // redirect logic here if needed
            } else {
                setError('Credenciales incorrectas');
            }
        } catch {
            setError('Error al iniciar sesión. Inténtalo de nuevo.');
        }
    };

    return (
        <>
            <style>{`
                .login-container {
                    max-width: 400px;
                    margin: 0 auto;
                    background: white;
                    padding: 36px 32px 40px;
                    border-radius: 12px;
                    box-shadow: 0 12px 24px rgba(0,0,0,0.12);
                    font-family: 'Inter', system-ui, sans-serif;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .login-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #1f2937; /* Dark gray */
                    text-align: center;
                    margin-bottom: 8px;
                }
                form input {
                    width: 100%;
                    padding: 14px 16px;
                    font-size: 1rem;
                    border: 1.5px solid #d1d5db;
                    border-radius: 8px;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    color: #374151;
                    font-family: 'Inter', system-ui, sans-serif;
                }
                form input::placeholder {
                    color: #9ca3af;
                }
                form input:focus {
                    outline: none;
                    border-color: #2563eb; /* blue-600 */
                    box-shadow: 0 0 6px #2563ebaa;
                    background: #fff;
                }
                form button {
                    width: 100%;
                    padding: 14px 0;
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: #fff;
                    background: linear-gradient(90deg, #2563eb, #1e40af);
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background 0.3s ease, transform 0.2s ease;
                    font-family: 'Inter', system-ui, sans-serif;
                }
                form button:hover {
                    background: linear-gradient(90deg, #1e40af, #2563eb);
                    transform: scale(1.03);
                }
                .error-message {
                    color: #dc2626; /* Red-600 */
                    font-size: 0.9rem;
                    text-align: center;
                    margin-top: -12px;
                    margin-bottom: 12px;
                }
                @media (max-width: 480px) {
                    .login-container {
                        padding: 28px 20px 32px;
                    }
                    .login-title {
                        font-size: 2rem;
                    }
                }
            `}</style>
            <div className="login-container" role="main" aria-label="Login form">
                <h1 className="login-title">Iniciar sesión</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <input
                        type="text"
                        name="username"
                        placeholder="Nombre de usuario"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        aria-label="Nombre de usuario"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        aria-label="Contraseña"
                        autoComplete="current-password"
                    />
                    {error && <p className="error-message" role="alert">{error}</p>}
                    <button type="submit" aria-label="Enviar formulario de inicio de sesión">Entrar</button>
                </form>
            </div>
        </>
    );
};

export default Login;

