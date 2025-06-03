import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text || 'black'};
`;

const Input = styled.input`
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.border || '#ccc'};
  border-radius: 6px;
  outline: none;
  background: ${({ theme }) => theme.inputBackground || '#fff'};
  color: ${({ theme }) => theme.text || 'black'};

  &:focus {
    border-color: ${({ theme }) => theme.primary || '#007bff'};
  }
`;

const TextInput = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default TextInput;
