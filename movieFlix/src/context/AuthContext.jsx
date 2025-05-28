import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user on mount or token change
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        setAuthToken(token);
        try {
          // We're just using the token itself, no need for a /me endpoint
          // The token contains user ID and username
          setIsAuthenticated(true);
          setLoading(false);
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Set auth token for all requests
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        user,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};