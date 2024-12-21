import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated and no token in localStorage, redirect to login page
  const token = localStorage.getItem('token');
  if (!isAuthenticated && !token) {
    return <Navigate to="/" />;
  }

  return children; // Render child components (e.g., Dashboard)
};

export default ProtectedRoute;
