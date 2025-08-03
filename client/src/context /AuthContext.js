import { createContext, useState, useEffect } from 'react';
import { auth as authApi } from '../api'; 

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Basic check if token is potentially expired (client-side only)
          // For full validation, a backend API call would be needed
          const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
          if (decodedToken.exp * 1000 > Date.now()) {
            setUser(parsedUser);
          } else {
            console.log('Token expired, logging out.');
            localStorage.clear();
          }
        } catch (e) {
          console.error('Failed to parse user data from localStorage', e);
          localStorage.clear(); 
        }
      }
      setLoading(false);
    };

    loadUserFromStorage();
  },);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const authContextValue = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children} {/* Render children only after loading check */}
    </AuthContext.Provider>
  );
};
