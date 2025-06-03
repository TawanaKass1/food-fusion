import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';

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

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState(null);

  const handleReset = async () => {
    const userId = localStorage.getItem("resetUserId");
    if (!userId) return setStatus({ type: 'error', message: 'No verified user found.' });

    try {
      const res = await axios.post("http://localhost:8080/api/user/reset-password", {
        userId,
        newPassword,
      });
      if (res.data.success) {
        setStatus({ type: 'success', message: 'Password reset successful!' });
        localStorage.removeItem("resetUserId");
      } else {
        setStatus({ type: 'error', message: 'Reset failed.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'An error occurred.' });
    }
  };

  return (
    <Container>
      <Title>Reset Password</Title>
      <TextInput
        label="New Password"
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <div onClick={handleReset}>
        <Button text="Reset Password" />
      </div>
      {status && status.type === 'error' && <ErrorText>{status.message}</ErrorText>}
      {status && status.type === 'success' && <SuccessText>{status.message}</SuccessText>}
    </Container>
  );
};

export default ResetPassword;
