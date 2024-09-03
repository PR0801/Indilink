// src/pages/CartPage.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContainer>
      <h1>Your Cart</h1>
      <CartItems>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItem key={index}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemDetails>
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p> {/* Show quantity */}
                <RemoveButton onClick={() => removeFromCart(item)}>Remove</RemoveButton>
              </ItemDetails>
            </CartItem>
          ))
        ) : (
          <EmptyCart>Your cart is empty.</EmptyCart>
        )}
      </CartItems>
      <CartFooter>
        <TotalAmount>Total: ${totalAmount.toFixed(2)}</TotalAmount>
        <ActionButtons>
          <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
          <ContinueShoppingLink to="/products">Continue Shopping</ContinueShoppingLink>
        </ActionButtons>
      </CartFooter>
    </CartContainer>
  );
};

export default CartPage;

const CartContainer = styled.div`
  background: linear-gradient(
    90deg,
    rgba(224, 178, 255, 0.6) 0%,
    rgba(255, 230, 230, 0.6) 50%,
    rgba(255, 199, 120, 0.6) 100%
  );
  padding: 2rem;
  border-radius: 8px;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh; /* Ensure full height */
  box-sizing: border-box;
`;

const CartItems = styled.div`
  margin: 2rem 0;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  margin-left: 1rem;
  flex-grow: 1;
  h3 {
    font-size: 1.2rem;
    margin: 0;
  }
  p {
    font-size: 1rem;
    margin: 0.5rem 0;
  }
`;

const RemoveButton = styled.button`
  background-color: #dc0073;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c00067;
  }
`;

const EmptyCart = styled.p`
  font-size: 1.2rem;
  color: #777;
  text-align: center;
`;

const CartFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
`;

const TotalAmount = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  padding-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const CheckoutButton = styled(Link)`
  background-color: #04e762;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  &:hover {
    background-color: #03c652;
  }
`;

const ContinueShoppingLink = styled(Link)`
  background-color: #04e762;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  &:hover {
    background-color: #03c652;
  }
`;
