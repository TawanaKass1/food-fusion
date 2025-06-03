import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: black;
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(null);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setStatus(null);
    try {
      const res = await axios.post("http://localhost:8080/api/user/forgot", { name, email });
      if (res.data.success) {
        localStorage.setItem("resetUserId", res.data.userId); // Save user ID
        setStatus({ type: 'success', message: 'Verified! Click below to reset password.' });
        setVerified(true);
      } else {
        setStatus({ type: 'error', message: 'Verification failed.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'An error occurred.' });
    }
  };

  return (
    <Container>
      <Title>Forgot Password</Title>
      <TextInput label="Name" value={name} onChange={e => setName(e.target.value)} />
      <TextInput label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <div onClick={handleVerify}>
        <Button text="Verify Account" />
      </div>
      {status && status.type === 'error' && <ErrorText>{status.message}</ErrorText>}
      {status && status.type === 'success' && <SuccessText>{status.message}</SuccessText>}
      {verified && (
        <div onClick={() => navigate('/reset-password')} style={{ marginTop: '15px' }}>
          <Button text="Reset Password" />
        </div>
      )}
    </Container>
  );
};

export default ForgotPassword;
