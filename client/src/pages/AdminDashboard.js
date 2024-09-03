// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch users and products data from API or database
    // This is a placeholder for demonstration purposes
    const fetchData = async () => {
      const usersResponse = await fetch('/api/users'); // Adjust API endpoint as needed
      const usersData = await usersResponse.json();
      setUsers(usersData);

      const productsResponse = await fetch('/api/products'); // Adjust API endpoint as needed
      const productsData = await productsResponse.json();
      setProducts(productsData);
    };

    fetchData();
  }, []);

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
  };

  const handleApproveSeller = () => {
    // Handle seller approval logic
    console.log('Approving seller:', selectedUser);
  };

  const handleDeleteProduct = () => {
    // Handle product deletion logic
    console.log('Deleting product:', selectedProduct);
  };

  return (
    <DashboardContainer>
      <h1>Admin Dashboard</h1>
      <Section>
        <h2>Manage Users</h2>
        <UserList>
          {users.map(user => (
            <UserItem key={user.id} onClick={() => handleUserSelection(user)}>
              {user.email} - {user.role}
            </UserItem>
          ))}
        </UserList>
        {selectedUser && (
          <UserDetails>
            <h3>Selected User Details</h3>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
            {selectedUser.role === 'seller' && (
              <ApproveButton onClick={handleApproveSeller}>Approve Seller</ApproveButton>
            )}
          </UserDetails>
        )}
      </Section>

      <Section>
        <h2>Manage Products</h2>
        <ProductList>
          {products.map(product => (
            <ProductItem key={product.id} onClick={() => handleProductSelection(product)}>
              {product.name} - {product.price}
            </ProductItem>
          ))}
        </ProductList>
        {selectedProduct && (
          <ProductDetails>
            <h3>Selected Product Details</h3>
            <p>Name: {selectedProduct.name}</p>
            <p>Price: {selectedProduct.price}</p>
            <p>Description: {selectedProduct.description}</p>
            <DeleteButton onClick={handleDeleteProduct}>Delete Product</DeleteButton>
          </ProductDetails>
        )}
      </Section>
    </DashboardContainer>
  );
};

export default AdminDashboard;

const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #e0f7fa;
  }
`;

const UserDetails = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ApproveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #04e762;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #028c4a;
  }
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProductItem = styled.li`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #e0f7fa;
  }
`;

const ProductDetails = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc0073;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c40052;
  }
`;
