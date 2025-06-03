import React, { useState } from 'react';
import { Modal } from '@mui/material';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';
import AuthImg from '../utils/Images/aut.jpg';
import LogoImage from '../utils/Images/foodfusion.png';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust path

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 1000px;
  height: 80vh;
  background: white;
  margin: auto;
  margin-top: 5vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 90vh;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bg || 'white'};
`;

const Left = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 40px;
  left: 40px;
  width: 120px;
  height: auto;
  z-index: 10;
  object-fit: contain;

  @media screen and (max-width: 1024px) {
    width: 100px;
  }
`;

const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  position: relative;
  flex: 0.9;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex: 1;
    padding: 20px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  padding: 2px;
  width: 32px;
  height: 32px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: grey;
  }
`;

const Text = styled.div`
  font-size: 16px;
  display: flex;
  gap: 12px;
  text-align: center;
  color: black;
`;

const TextButton = styled.div`
  color: #442a00;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: grey;
  }
`;

const Authentication = ({ openSign, setOpenSign }) => {
  const [login, setLogin] = useState(false);
  const { login: contextLogin } = useContext(AuthContext);

  return (
    <Modal open={openSign} onClose={() => setOpenSign(false)}>
      <Wrapper>
        <Container>
          <Left>
            <Logo src={LogoImage} alt="Logo" />
            <Image src={AuthImg} alt="Authentication Background" />
          </Left>
          <Right>
            <CloseButton>
              <Close onClick={() => setOpenSign(false)} />
            </CloseButton>
            {login ? (
              <>
                <SignIn />
                <Text>
                  Don’t have an account?{' '}
                  <TextButton onClick={() => setLogin(false)}>Sign Up</TextButton>
                </Text>
              </>
            ) : (
              <>
                <SignUp />
                <Text>
                  Already have an account?{' '}
                  <TextButton onClick={() => setLogin(true)}>Sign In</TextButton>
                </Text>
              </>
            )}
          </Right>
        </Container>
      </Wrapper>
    </Modal>
  );
};

export default Authentication;
