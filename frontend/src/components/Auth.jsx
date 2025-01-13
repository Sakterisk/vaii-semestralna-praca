import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    role: null,
  });

  async function checkAuth() {
    try {
      const response = await axios.get('/api/user'); 
      setAuth({ isLoggedIn: true, role: (response.data.id === 1) ? 'admin' : 'user'});
    } catch (error) {
    }
  }

  // Load persisted state on initialization
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
