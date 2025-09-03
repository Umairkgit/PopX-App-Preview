import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem('popx_user') || 'null');
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    sessionStorage.setItem('popx_user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('popx_user');
  };

  // Signup function
  const signup = (userData) => {
    // Get existing users from sessionStorage
    const users = JSON.parse(sessionStorage.getItem('popx_users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Add new user
    const newUser = { ...userData, id: Date.now(), createdAt: new Date().toISOString() };
    users.push(newUser);
    sessionStorage.setItem('popx_users', JSON.stringify(users));
    
    // Auto login after signup
    login(newUser);
    return newUser;
  };

  // Authenticate user function
  const authenticateUser = (email, password) => {
    const users = JSON.parse(sessionStorage.getItem('popx_users') || '[]');
    return users.find(u => u.email === email && u.password === password);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    signup,
    authenticateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};