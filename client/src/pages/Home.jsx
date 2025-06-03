import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderImage from "../utils/Images/auth.png";
import Logo from "../utils/Images/foodfusion.png";
import { Category } from "../utils/data";
import RecipeCategoryCard from '../components/cards/RecipeCategoryCard';
import ImageSlider from '../components/cards/RecipeCard';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTimes } from 'react-icons/fa';
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import axios from 'axios';

const Container = styled.div`
  background-color: white;
  padding: 20px 30px 100px;
  min-height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Img = styled.img`
  width: 90%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;

  @media (max-width: 750px) {
    gap: 16px;
  }
`;

const Slider = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;

  @media (max-width: 750px) {
    gap: 16px;
  }
`;

const MissionSection = styled.section`
  width: 100%;
  background-color: #fff8f0;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MissionContent = styled.div`
  max-width: 800px;
  text-align: center;
`;

const MissionHeading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #442a00;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const MissionText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: white;
  padding: 40px 24px 20px;
  color: #4b5563;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
`;

const FooterColumn = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

const FooterLink = styled.a`
  font-size: 14px;
  color: #4b5563;
  text-decoration: none;

  &:hover {
    color: black;
  }
`;

const FooterLogo = styled.img`
  height: 122px;
  width: 70%;
  margin-bottom: 12px;
`;

const FooterIcons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;

  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
`;

const NewsletterInput = styled.div`
  display: flex;
  margin-top: 12px;

  input {
    padding: 6px 12px;
    border: 1px solid #d1d5db;
    border-right: none;
    border-radius: 6px 0 0 6px;
    outline: none;
    flex: 1;
  }

  button {
    background-color: black;
    color: white;
    border: none;
    border-radius: 0 6px 6px 0;
    padding: 6px 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #d1d5db;
  margin-top: 32px;
  padding-top: 16px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 16px;
  align-text: center;
  justify-content: center;

  a {
    color: #4b5563;
    text-decoration: none;

    &:hover {
      color: black;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
`;

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  color: black;
  font-size: 20px;
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

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
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
      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <CloseIcon onClick={() => setIsModalOpen(false)} />
            <h2 style={{ fontWeight: 800 }}>Join us</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>Please enter details to create a new account</p>
            <div style={{ display: "flex", gap: "16px", flexDirection: "column", marginTop: '20px' }}>
              <TextInput label="Name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
              <TextInput label="Email Address" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextInput label="Password" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div onClick={handleSignUp}><Button text="Sign Up" /></div>
              {status && status.type === 'error' && <ErrorText>{status.message}</ErrorText>}
              {status && status.type === 'success' && <SuccessText>{status.message}</SuccessText>}
            </div>
          </ModalContainer>
        </ModalOverlay>
      )}

      <Section style={{ alignItems: "center" }}>
        <Img src={HeaderImage} />
      </Section>

      <Section style={{ alignItems: "center" }}>
        <Title>Browse through some of our featured recipes</Title>
        <CardWrapper>
          {Category.map((category) => (
            <RecipeCategoryCard key={category.name} Category={category} />
          ))}
        </CardWrapper>
      </Section>

      <MissionSection>
        <MissionContent>
          <MissionHeading>Our Mission</MissionHeading>
          <MissionText>
            At <strong>Food Fusion</strong>, our mission is to inspire and empower food lovers around the world by connecting them with authentic recipes, diverse culinary traditions, and innovative cooking experiences.
          </MissionText>
        </MissionContent>
      </MissionSection>

      <Section>
        <Slider>
          <Title>Our Culinary Trends & Upcoming Events</Title>
        </Slider>
        <ImageSlider />
      </Section>

      <FooterWrapper>
        <FooterContainer>
          <FooterColumn>
            <FooterLogo src={Logo} alt="logo" />
            <FooterIcons>
              <FaInstagram />
              <FaFacebookF />
              <FaTwitter />
              <FaLinkedinIn />
            </FooterIcons>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>COMPANY</FooterTitle>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/recipe">Recipes</FooterLink>
            <FooterLink href="/communitycookbook">Community</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/culinaryresources">Culinary</FooterLink>
            <FooterLink href="/educationalresources">Educational</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>SUPPORT</FooterTitle>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>STAY UPDATED</FooterTitle>
            <p>Subscribe to our newsletter for inspiration and special offers.</p>
            <NewsletterInput>
              <input type="text" placeholder="Your email" />
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" width="16" height="16" viewBox="0 0 24 24">
                  <path d="M5 12h14M19 12l-4-4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </NewsletterInput>
          </FooterColumn>
        </FooterContainer>

        <FooterBottom>
          <p>© {new Date().getFullYear()} Food Fusion. All rights reserved.</p>
          <BottomLinks>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/cookies">Cookies Policy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </BottomLinks>
        </FooterBottom>
      </FooterWrapper>
    </Container>
  );
};

export default HomePage;
