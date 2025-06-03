import React, { useState } from "react";
import styled from 'styled-components';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Logo from '../utils/Images/foodfusion.png'; 
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const response = await axios.post('http://localhost:8080/api/contact', formData); 
      if (response.data.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Something went wrong on the server.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <ContactWrapper>
        <ContactContainer>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Please fill out the form below.</p>

          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit">Send Message</Button>
            {status && <StatusMessage>{status}</StatusMessage>}
          </Form>
        </ContactContainer>
      </ContactWrapper>

      {/* Footer */}
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
    </>
  );
};

export default Contact;

///////////////////////////
// Styled Components Below
///////////////////////////

const ContactWrapper = styled.div`
  padding: 60px 20px;
  background:  #e5cfb5;
  border-radius: 20px;
  margin-top: 12px;
  text-align: center;
`;

const StatusMessage = styled.p`
  margin-top: 10px;
  color: green;
  font-weight: bold;
`;

const ContactContainer = styled.div`
  max-width: 600px;
  margin: auto;
`;

const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
`;

const Button = styled.button`
  padding: 14px;
  background-color: #442a00;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: grey;
  }
`;

const FooterWrapper = styled.footer`
  background-color: #FFFFFF;
  color: #9ca3af;
  padding: 60px 20px 20px 20px;
  margin-top: 60px;
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: auto;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  p {
    color: #9ca3af;
    font-size: 0.9rem;
  }
`;

const FooterLogo = styled.img`
  width: 140px;
  margin-bottom: 20px;
`;

const FooterIcons = styled.div`
  display: flex;
  gap: 16px;
  font-size: 1.5rem;
  margin-top: 10px;

  svg {
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: black;
    }
  }
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;

  &:hover {
    color: black;
  }
`;

const NewsletterInput = styled.div`
  margin-top: 10px;
  display: flex;

  input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 8px 0 0 8px;
    font-size: 1rem;
  }

  button {
    background-color: black;
    border: none;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: grey;
    }

    svg {
      stroke: white;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #374151;
  margin-top: 40px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: black;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;

    &:hover {
      color: grey;
    }
  }
`;
