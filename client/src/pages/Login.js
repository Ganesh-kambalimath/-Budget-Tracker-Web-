import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { auth as authApi } from '../api';
import { Form, Button, Alert } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authApi.signin({ username, password });
      login(
        { id: response.data.id, username: response.data.username, email: response.data.email },
        response.data.accessToken
      );
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data |
                    | err.message);
setError(err.response?.data?.message |

| 'Login failed. Please check your credentials.');
}
};

  return (
    <div className="container page-container">
      <h1 className="page-title">Login to MoneyMap</h1>
      <Form onSubmit={handleSubmit} className="w-50 mx-auto">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="usernameInput">Username</Form.Label>
          <Form.Control
            type="text"
            id="usernameInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="passwordInput">Password</Form.Label>
          <Form.Control
            type="password"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
