import React, { useState } from 'react'
import { Modal } from "@mui/material";
import styled from 'styled-components';
import { Close } from "@mui/icons-material";
import AuthImg from "../utils/Images/aut.jpg"
import LogoImage from "../utils/Images/foodfusion.png";
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Container = styled.div`
    flex: 1;
    height: 100%;
    background: ${({ theme }) => theme.bg};
`;
const Left = styled.div`
    flex: 1;
    position: relative;
    @media screen and (max-width: 768px){
        display: none;
    }
`;
const Logo = styled.img`
    position: absolute;
    top: 40px;
    left: 60px;
    z-index: 10;
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
        flex:1;
    }
`;
const CloseButton = styled.div`
    position: absolute;
    top:20px;
    right: 20px;
    border-radius: 50%;
    padding: 2px;
    width: 32px;
    height: 32px;
    border: 1px solid black;
    display:flex;
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
    color: white;
    cursor:pointer;
    transition: all 0.3s ease;
    font-weight: 600;
`;


const Authentication = ({ openSign, setOpenSign}) => {
    const[login, setLogin] = useState(false);
  return (
    <Modal open={openSign} onClose={() => setOpenSign(false)}>
        <Container>
            <Left>
                <Logo src={LogoImage}/>
                <Image src={AuthImg}/>
            </Left>
            <Right>
                <CloseButton>
                    <Close onClick={() => setOpenSign(false)}/>
                </CloseButton>
                {login ? (
                    <>
                    <SignIn/>
                    <Text>
                        {" "}
                        Don't have an account ? {" "} <TextButton onClick={() => setLogin(false)}>Sign Up</TextButton></Text>
                    </>
                    ) : (
                        <>
                    <SignUp/>
                    <Text>
                        Already have an account ?{" "} <TextButton onClick={() => setLogin(true)}>Sign In</TextButton></Text>
                    </>
                )
                    }
            </Right>
        </Container>
    </Modal>
  );
}

export default Authentication