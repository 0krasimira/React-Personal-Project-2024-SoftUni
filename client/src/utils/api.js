import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export const useApi = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const fetchWithAuth = async (url, options = {}) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                // Token expired or unauthorized
                logout();
                navigate('/auth/login'); // Corrected path
                throw new Error('Session expired. Please log in again.');
            }

            return response.json();
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    };

    return { fetchWithAuth };
};
