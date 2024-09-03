import React, { useState } from 'react';
import styled from 'styled-components';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    payment: ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.payment) newErrors.payment = "Payment method is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Process form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Container>
      <Title>Checkout</Title>
      <FormContainer>
        <h2>Shipping Information</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Full Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />
            {errors.name && <Error>{errors.name}</Error>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address">Address:</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="1234 Elm Street"
            />
            {errors.address && <Error>{errors.address}</Error>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="payment">Payment Method:</Label>
            <Select
              id="payment"
              name="payment"
              value={formData.payment}
              onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
            >
              <option value="">Select Payment Method</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="paypal">PayPal</option>
            </Select>
            {errors.payment && <Error>{errors.payment}</Error>}
          </FormGroup>
          <Button type="submit">Complete Purchase</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Checkout;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  max-width: 800px;
  margin: 2rem auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FormContainer = styled.section`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

const Error = styled.p`
  color: #dc0073;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  background-color: #04e762;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #03c652;
  }
`;
