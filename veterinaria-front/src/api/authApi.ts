import axios from 'axios';

export const login = async (credentials: { username: string; password: string }) => {
    try {
        const response = await axios.post('/api/auth/login', credentials);
        return response.data.token;
    } catch (error) {
        console.error('Login failed', error);
        return null;
    }
};
