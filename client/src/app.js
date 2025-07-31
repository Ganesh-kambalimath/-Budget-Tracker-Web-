

import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound'; 


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const mockUser = { username: 'Ganesh', email: 'ganesh@example.com' }; // [4, 5, 3]
      setUser(mockUser);
    }
  },);


  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token); 
  };

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const authContextValue = { user, login, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  return (
    <AuthProvider> {/* Wrap the entire application with the AuthProvider */}
      <BrowserRouter> {/* Enables client-side routing [6] */}
        <div className="App">
          {/* You might have a global Header/Navbar component here */}
          {/* <Header /> */}

          <Routes> {/* Defines the routing paths [6] */}
            {/* Public Routes */}
            <Route path="/" element={<Home />} /> {/* Home page [6, 3] */}
            <Route path="/login" element={<Login />} /> {/* Login page [6, 3] */}
            <Route path="/register" element={<Register />} /> {/* Register page [6, 3] */}

            {/* Protected Route for Dashboard */}
            {/* The /* allows for nested routes within the Dashboard, e.g., /dashboard/transactions */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> {/* Dashboard page [6, 3] */}

            {/* Catch-all route for 404 Not Found page [3] */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* You might have a global Footer component here */}
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
