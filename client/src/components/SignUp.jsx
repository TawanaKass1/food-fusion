import Container from '@mui/material/Container';
import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from "./TextInput";
import Button from "./Button";
import axios from 'axios';

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: black;
`;

const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: grey;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;

const SuccessText = styled.div`
  color: green;
  font-size: 14px;
  margin-top: 8px;
`;

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const handleSignUp = async () => {
    setStatus(null);
    try {
      const response = await axios.post("http://localhost:8080/api/user/signup", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        setStatus({ type: 'success', message: 'Account created successfully!' });
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setStatus({ type: 'error', message: response.data.message || 'Registration failed.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <Container>
      <div>
        <Title>Create New Account</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <TextInput
          label="Name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextButton>Forgot Password?</TextButton>
        <div onClick={handleSignUp}>
          <Button text="Sign Up" />
        </div>
        {status && status.type === 'error' && <ErrorText>{status.message}</ErrorText>}
        {status && status.type === 'success' && <SuccessText>{status.message}</SuccessText>}
      </div>
    </Container>
  );
};

export default SignUp;
