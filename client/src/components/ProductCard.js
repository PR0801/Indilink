// src/components/ProductCard.js
import React from 'react';
import styled from 'styled-components';

const ProductCard = ({ product, addToCart }) => {
  const { id, product_name, description, price } = product;

  return (
    <Card>
      <h2>{product_name}</h2>
      <p>{description}</p>
      <p>₹{price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0.5rem 0;
  }

  button {
    background: #007bff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #0056b3;
    }
  }
`;
