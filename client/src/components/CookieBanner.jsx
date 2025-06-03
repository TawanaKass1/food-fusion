import React, { useState } from 'react';
import styled from 'styled-components';

const CookieBanner = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  // Function to handle cookie acceptance
  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setIsAccepted(true);
  };

  if (isAccepted || localStorage.getItem('cookieAccepted') === 'true') {
    return null; // Don't show banner if already accepted
  }

  return (
    <BannerWrapper>
      <BannerContent>
        <Header>
          <img className="cookie-icon" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/cookies/cookieImage1.svg" alt="cookieImage1" />
          <h2>Cookie Notice</h2>
        </Header>
        <p>
          We use cookies to ensure that we give you the best experience on our website. 
          <a href="#" className="font-medium underline">Read cookies policies</a>.
        </p>
        <Footer>
          <a href="#" className="underline text-xs">Manage your preferences</a>
          <button type="button" onClick={handleAccept} className="accept-btn">
            Accept
          </button>
        </Footer>
      </BannerContent>
    </BannerWrapper>
  );
};

export default CookieBanner;

// Styled Components
const BannerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
`;

const BannerContent = styled.div`
  background-color: white;
  color: #6b7280;
  padding: 20px;
  width: 80%;
  max-width: 400px;
  border-radius: 8px;
  text-align: center;
  font-size: 0.875rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
  .cookie-icon {
    height: 24px;
    width: 24px;
  }
  h2 {
    font-size: 1.125rem;
    color: #1f2937;
    font-weight: 600;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 16px;

  .underline {
    text-decoration: underline;
    font-size: 0.75rem;
  }

  .accept-btn {
    background-color:  #442a00;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;

    &:hover {
      background-color: grey;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;
