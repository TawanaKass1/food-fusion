import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const ButtonStyled = styled.button`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 16px 26px;
  box-shadow: 1px 20px 35px 0px #442a00;
  border: 1px solid ${({ theme }) => theme.primary};
  text-decoration: none;

  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `
        background: ${theme.secondary};
        border: 1px solid ${theme.secondary};
      `
      : `
        background: #442a00;
      `}

  ${({ flex }) =>
    flex &&
    `
    flex: 1;
  `}

  ${({ small }) =>
    small &&
    `
    padding: 10px 28px;
  `}

  ${({ outlined, theme }) =>
    outlined &&
    `
    background: transparent;
    color: ${theme.primary};
    box-shadow: none;
  `}

  ${({ full }) =>
    full &&
    `
    width: 100%;
  `}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

const Button = ({
  text,
  isLoading = false,
  isDisabled = false,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
  Link,
}) => {
  const content = (
    <>
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </>
  );

  const sharedProps = {
    disabled: isDisabled || isLoading,
    type: "button",
    flex,
    small,
    outlined,
    full,
  };

  if (Link) {
    return (
      <ButtonStyled as={RouterLink} to={Link} {...sharedProps}>
        {content}
      </ButtonStyled>
    );
  }

  return (
    <ButtonStyled onClick={onClick} {...sharedProps}>
      {content}
    </ButtonStyled>
  );
};

export default Button;
