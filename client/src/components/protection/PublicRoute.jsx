// src/components/protection/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    // Redirect to home if authenticated
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children; // Render children components if not authenticated
};

export default PublicRoute;
