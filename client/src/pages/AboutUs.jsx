import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Category1 } from "../utils/data";
import Logo from "../utils/Images/foodfusion.png";
import RecipeCategoryCard from '../components/cards/RecipeCategoryCard';

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background: #fff8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hero = styled.section`
  width: 100%;
  height: 400px;
  background: url('/path/to/your/background-image.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const QuoteOverlay = styled.div`
  background: #442a00;
  padding: 20px 40px;
  border-radius: 12px;
  text-align: center;
  color: black;
  font-size: 32px;
  font-weight: 600;
  max-width: 90%;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 10px 20px;
  }
`;

const Content = styled.div`
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #442a00;
`;

const Text = styled.p`
  font-size: 18px;
  color: #333;
  line-height: 1.6;

  @media (max-width: 768px) {
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

  a {
    color: #4b5563;
    text-decoration: none;

    &:hover {
      color: black;
    }
  }
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

// Modal button styles
const ModalButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const DisabledButton = styled(ModalButton)`
  opacity: 0.5;
  cursor: not-allowed;
`;

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
};

// Modal component
const RestrictedModal = ({ isOpen }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2>You must be logged in to access this page</h2>
        <ModalButton onClick={() => navigate('/')}>Log In</ModalButton>
        <DisabledButton disabled>Close</DisabledButton>
      </div>
    </div>
  );
};

// Main page component
const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn && <RestrictedModal isOpen={isModalOpen} />}

      <Container>
        <Hero>
          <QuoteOverlay>
            “Cooking is an art, but all art requires knowing something about the techniques and materials.” – Nathan Myhrvold
          </QuoteOverlay>
        </Hero>

        <Content>
          <section>
            <SubTitle>Our Culinary Philosophy</SubTitle>
            <Text>
              At FoodFusion, we believe that food is more than just sustenance — it's an expression of culture, creativity, and connection.
              Our philosophy revolves around celebrating diversity in culinary traditions while innovating for modern tastes.
            </Text>
          </section>

          <section>
            <SubTitle>Our Values</SubTitle>
            <Text>
              ✨ Passion for quality <br />
              🌱 Emphasis on fresh, sustainable ingredients <br />
              🤝 Inclusivity in cuisine and culture <br />
              👩‍🍳 Empowering home cooks and professionals alike
            </Text>
          </section>

          <section>
            <SubTitle>Meet the Team</SubTitle>
            <CardWrapper>
              {Category1.map((category) => (
                <RecipeCategoryCard key={category.name} Category={category} />
              ))}
            </CardWrapper>
          </section>
        </Content>

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
            </BottomLinks>
          </FooterBottom>
        </FooterWrapper>
      </Container>
    </>
  );
};

export default AboutUs;
