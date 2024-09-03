import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated on initial load
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token); // Store token
    setIsAuthenticated(true);
    navigate('/'); // Redirect to home or desired route
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Clear token
    setIsAuthenticated(false);
    navigate('/'); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
