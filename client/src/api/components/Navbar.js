import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function AppNavbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MoneyMap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user? (
              <>
                <Navbar.Text className="me-3">
                  Welcome, <span className="fw-bold">{user.username}</span>!
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-light" className="me-2">Login</Button>
                <Button as={Link} to="/register" variant="light">Register</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
