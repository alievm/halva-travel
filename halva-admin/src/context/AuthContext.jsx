import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
  
    const login = async (values) => {
      const res = await axios.post('/auth/login', values);
      const receivedToken = res.data.token;
      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setToken(null);
    };
  
    return (
      <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);