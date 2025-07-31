
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound'; 
import { AuthContext, AuthProvider } from './context/AuthContext'; 

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  return (
    <AuthProvider> {/* Wrap the entire application with the AuthProvider [16, 17] */}
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
            {/* The /* allows for nested routes within the Dashboard, e.g., /dashboard/transactions [6] */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> {/* Dashboard page [6, 3] */}

            {/* Catch-all route for 404 Not Found page [18] */}
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
