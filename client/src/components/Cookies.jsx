import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 80px auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  color: #333;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 16px;
  color: #555;
  line-height: 1.6;
`;

const Cookies = () => {
  return (
    <Container>
      <Title>Cookies Information</Title>
      <Paragraph>
        FoodFusion uses cookies to enhance your browsing experience. Cookies help us remember your preferences and optimize your visits.
      </Paragraph>
      <Paragraph>
        These cookies do not store any personal information and cannot track your activities on other websites.
      </Paragraph>
      <Paragraph>
        You can manage or disable cookies through your browser settings at any time.
      </Paragraph>
      <Paragraph>
        By continuing to browse FoodFusion, you consent to our use of cookies.
      </Paragraph>
    </Container>
  );
};

export default Cookies;
