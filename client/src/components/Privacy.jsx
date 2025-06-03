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

const Privacy = () => {
  return (
    <Container>
      <Title>Privacy Policy</Title>
      <Paragraph>
        Welcome to FoodFusion! We value your privacy and are committed to protecting your personal information.
      </Paragraph>
      <Paragraph>
        Any information you provide on our platform (such as signing up or submitting a recipe) will be used solely for improving your experience.
      </Paragraph>
      <Paragraph>
        We do not sell or share your personal data with third parties. For detailed information, please contact our support team.
      </Paragraph>
      <Paragraph>
        By using FoodFusion, you agree to our privacy practices described above.
      </Paragraph>
    </Container>
  );
};

export default Privacy;
