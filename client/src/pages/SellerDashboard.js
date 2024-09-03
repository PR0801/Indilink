// src/pages/SellerDashboard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { baseUrl } from '../components/common/baseUrl';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    certifications: '',
    picture: null,
  });

  const [verificationStatus, setVerificationStatus] = useState({});
  const [pictureUrls, setPictureUrls] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/seller/products'); // Adjust API endpoint as needed
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, picture: e.target.files[0] });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await fetch(baseUrl+'/api/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        image: newProduct.image,
        certifications: newProduct.certifications
      })
    });
    setProducts([...products, newProduct]);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      image: '',
      certifications: '',
      picture: null,
    });
  };

  const handleUploadPicture = async (productId) => {
    const formData = new FormData();
    formData.append('picture', newProduct.picture);

    await fetch(`/api/seller/products/${productId}/picture`, {
      method: 'POST',
      body: formData
    });

    // Optionally fetch the updated picture URL
    const pictureResponse = await fetch(`/api/seller/products/${productId}/picture`);
    const pictureData = await pictureResponse.json();
    setPictureUrls(prevUrls => ({ ...prevUrls, [productId]: pictureData.pictureUrl }));
  };

  const handleUploadCertifications = async (productId, certData) => {
    await fetch(`/api/seller/products/${productId}/certifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ certifications: certData })
    });
    // Optionally fetch the updated status
    const statusResponse = await fetch(`/api/seller/products/${productId}/status`);
    const statusData = await statusResponse.json();
    setVerificationStatus(prevStatus => ({ ...prevStatus, [productId]: statusData }));
  };

  const fetchVerificationStatus = async (productId) => {
    const response = await fetch(`/api/seller/products/${productId}/status`);
    const data = await response.json();
    setVerificationStatus(prevStatus => ({ ...prevStatus, [productId]: data }));
  };

  return (
    <DashboardContainer>
      <h1>Seller Dashboard</h1>
      
      <Section>
        <h2>Add New Product</h2>
        <Form onSubmit={handleAddProduct}>
          <label>Product Name:</label>
          <Input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />

          <label>Description:</label>
          <Input type="text" name="description" value={newProduct.description} onChange={handleInputChange} required />

          <label>Price:</label>
          <Input type="text" name="price" value={newProduct.price} onChange={handleInputChange} required />

          <label>Image URL:</label>
          <Input type="text" name="image" value={newProduct.image} onChange={handleInputChange} />

          <label>Certifications:</label>
          <Input type="text" name="certifications" value={newProduct.certifications} onChange={handleInputChange} />

          <label>Product Picture:</label>
          <FileInput type="file" onChange={handleFileChange} />

          <SubmitButton type="submit">Add Product</SubmitButton>
        </Form>
      </Section>

      <Section>
        <h2>Manage Products</h2>
        <ProductList>
          {products.map(product => (
            <ProductItem key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Certifications: {product.certifications}</p>

              {/* Upload Product Picture Button */}
              <ActionButton onClick={() => handleUploadPicture(product.id)}>Upload Picture</ActionButton>
              {/* Upload Certifications Button */}
              <ActionButton onClick={() => handleUploadCertifications(product.id, product.certifications)}>Upload Certifications</ActionButton>

              {/* Check Verification Status Button */}
              <ActionButton onClick={() => fetchVerificationStatus(product.id)}>Check Status</ActionButton>

              {/* Display Product Picture */}
              {pictureUrls[product.id] && (
                <PictureContainer>
                  <img src={pictureUrls[product.id]} alt={`${product.name} Picture`} className="product-picture" />
                </PictureContainer>
              )}

              {/* Display Verification Status */}
              {verificationStatus[product.id] && (
                <StatusContainer>
                  <p>Status: {verificationStatus[product.id].status}</p>
                  <p>Message: {verificationStatus[product.id].message}</p>
                </StatusContainer>
              )}
            </ProductItem>
          ))}
        </ProductList>
      </Section>
    </DashboardContainer>
  );
};

export default SellerDashboard;

const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FileInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
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
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #008bf8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #005fa3;
  }
`;

const PictureContainer = styled.div`
  margin-top: 1rem;
`;

const StatusContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #e0f7fa;
  border-radius: 5px;
`;
