// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

    const login = (newToken, newUsername, newUserId) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', newUsername);
        localStorage.setItem('userId', newUserId);
        setToken(newToken);
        setUsername(newUsername);
        setUserId(newUserId);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setToken(null);
        setUsername(null);
        setUserId(null);
        navigate('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ token, username, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
