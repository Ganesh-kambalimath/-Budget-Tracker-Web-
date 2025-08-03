import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext'; //
import AppNavbar from './components/Navbar'; 

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories'; 
import Reports from './pages/Reports';    
import NotFound from './pages/NotFound';   

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading application...</div>; // Or a skeleton loader
  }

  if (!user) {

    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <AppNavbar /> {/* Global Navbar */}

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for 404 Not Found page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
