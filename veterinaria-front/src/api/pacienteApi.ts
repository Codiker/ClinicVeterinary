import { getToken } from '../utils/authUtils';

export const getPacientes = async () => {
    const token = getToken();
    const res = await fetch('/api/pacientes', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return res.json();
};
