import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const NavBar = () => {
  const { isAuthenticated, logout, userRole } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout(); // Perform logout
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <Nav>
      <NavList>
        <NavItem><Link to="/">Home</Link></NavItem>
        <NavItem><Link to="/about">About</Link></NavItem>
        <NavItem><Link to="/support">Support</Link></NavItem>
        {isAuthenticated ? (
          <>
            <NavItem><Link to="/cart">View Cart</Link></NavItem>
            <NavItem>
              <Link to="/profile">Profile</Link>
            </NavItem>
            {userRole === 'seller' && (
              <NavItem><Link to="/seller-dashboard">Seller Dashboard</Link></NavItem>
            )}
            <NavItem>
              <LogoutButton onClick={handleLogout} aria-label="Logout">Logout</LogoutButton>
            </NavItem>
          </>
        ) : (
          <NavItem><Link to="/register">Register/Login</Link></NavItem>
        )}
      </NavList>
    </Nav>
  );
};

export default NavBar;

// Styled components
const Nav = styled.nav`
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 1rem;
  a {
    text-decoration: none;
    color: #007bff;
    font-size: 1rem;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  text-decoration: underline;
  &:hover {
    color: #0056b3;
  }
`;
