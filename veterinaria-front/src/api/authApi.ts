import axios from 'axios';

export const login = async (credentials: { username: string; password: string }) => {
    try {
        const response = await axios.post('/api/auth/login', credentials);
        return response.data.token; // Asumiendo que el token se devuelve aquí
    } catch (error) {
        console.error('Login failed', error);
        return null;
    }
};
