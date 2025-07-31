import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    function Register() {
      const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        if (password!== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        alert(`User ${username} registered successfully! (Simulated)`);
        navigate('/login'); 

      return (
        <div className="container page-container">
          <h1 className="page-title">Register for MoneyMap</h1>
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
              <label htmlFor="emailInput" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="mb-3">
              <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPasswordInput"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Register</button>
            <p className="text-center mt-3">Already have an account? <a href="/login">Login here</a></p>
          </form>
        </div>
      );
    }

    export default Register;
