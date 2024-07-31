import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth(); // Use authentication context to check login status

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" />; // Redirect to login if not authenticated
    }

    return children; // Render children components if authenticated
};

export default ProtectedRoute;