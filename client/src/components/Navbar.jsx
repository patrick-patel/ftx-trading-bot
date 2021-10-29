import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, logout }) => (
  <div>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>FTX Trading Bot</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/">Dashboard</Link></Nav.Link>
            {isLoggedIn ? null : <Nav.Link><Link to="/login">Login</Link></Nav.Link>}
            {isLoggedIn ? null : <Nav.Link><Link to="/register">Register</Link></Nav.Link>}
            {isLoggedIn ? <Nav.Link><Link to="/settings">Settings</Link></Nav.Link> : null}
            {isLoggedIn ? <Nav.Link><Link to="/login" onClick={logout}>Logout</Link></Nav.Link> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
)

export default Navbar;