import React, { useState, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { AuthContext } from '../context/AuthContext'; 

    function Login() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const { login } = useContext(AuthContext);
      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'Ganesh' && password === 'password123') {
          const userData = { username: 'Ganesh', email: 'ganesh@example.com' }; 
          const token = 'mock-jwt-token-for-ganesh'; 
          login(userData, token);
          navigate('/dashboard'); 
        } else {
          alert('Invalid username or password. Try Ganesh/password123');
        }
      };

      return (
        <div className="container page-container">
          <h1 className="page-title">Login to MoneyMap</h1>
          <form onSubmit={handleSubmit} className="w-50 mx-auto">
            <div className="mb-3">
              <label htmlFor="usernameInput" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <p className="text-center mt-3">Don't have an account? <a href="/register">Register here</a></p>
          </form>
        </div>
      );
    }

    export default Login;
