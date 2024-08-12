// src/components/protection/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
        return <Navigate to="/auth/login" />;
    }

    return children; // Render children components if authenticated
};

export default ProtectedRoute;

