import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Initialize authentication state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token, name) => {
    localStorage.setItem('token', token); // Save the token
    // localStorage.setItem('name', name);  // Save the username
    setIsAuthenticated(true);
    navigate('/dashboard'); // Redirect to dashboard
  };
  

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('name');
    localStorage.removeItem('token'); // Clear token or other data
    navigate('/'); // Redirect to home page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
