import React from 'react';
import styled from 'styled-components';

import PastaGuide from '../assets/pdfs/pasta_guide.pdf';
import BeefGuide from '../assets/pdfs/rice_beef_guide.pdf';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Logo from '../utils/Images/foodfusion.png';
import HeroBackground from '../utils/Images/beef.jpg.jpg';

const recipeCards = [
  { title: "Italian Pasta Guide", file: PastaGuide },
  { title: "Rice and Beef Guide", file: BeefGuide },
];

const tutorials = [
  { title: "How to Perfectly Sear Steak", videoUrl: "https://www.youtube.com/watch?v=Z4ySQKWEWTs" },
  { title: "Secrets to Fluffy Pancakes", videoUrl: "https://youtu.be/FLd00Bx4tOk?si=cBIZBNK3cOyJ0D13" },
];

const instructionalVideos = [
  { title: "How to make chocolate cake", videoUrl: "https://www.youtube.com/embed/2XBvw_Ty-C0?si=mApc7R9PUDLVegq1" },
  { title: "How to Make Homemade Pasta | Gordon Ramsay", videoUrl: "https://www.youtube.com/embed/UYhKDweME3A?si=jAt1VcEwh4WiqsM4" },
  { title: "How to Bake Bread from Scratch | Joshua Weissman", videoUrl: "https://www.youtube.com/embed/lipLAgZkWN0?si=-nMkFMEuweAfB9ur" }
];
const PageContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px;
  background: #e5cfb5;
  border-radius: 20px;
`;

const HeroSection = styled.section`
  background-image: url(${HeroBackground});
  background-size: cover;
  background-position: center;
  padding: 100px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  margin-bottom: 60px;
`;

const HeroContent = styled.div`
  background: rgba(0, 0, 0, 0.5);
  display: inline-block;
  padding: 40px 60px;
  border-radius: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
`;

const Section = styled.section`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 32px;
  text-align: center;
  font-weight: bold;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
`;

const ResourceCard = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  text-align: center;
  transition: all 0.3s ease;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    color: #374151;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  }
`;

const DownloadButton = styled.a`
  display: inline-block;
  background-color: #442a00;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: grey;
  }
`;

const TutorialList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 1.1rem;
  color: #4b5563;

  li {
    background: #f3f4f6;
    padding: 14px 20px;
    border-radius: 12px;
    transition: background 0.3s;

    a {
      text-decoration: none;
      color: inherit;
      font-weight: 600;
    }

    &:hover {
      background: #dbeafe;
      color: #442a00;
    }
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`;

const VideoCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transition: all 0.3s ease;

  iframe {
    width: 100%;
    height: 200px;
    border: none;
  }

  &:hover {
    transform: scale(1.02);
  }
`;

const VideoTitle = styled.h4`
  padding: 16px;
  font-size: 1.2rem;
  text-align: center;
  color: #374151;
`;

// Footer Styles
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
  color: #000000;
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

const CulinaryResources = () => {
  return (
    <>
      <PageContainer>
        <HeroSection>
          <HeroContent>
            <HeroTitle>Explore Culinary Resources</HeroTitle>
            <HeroSubtitle>Master your cooking skills with recipes, tutorials, and videos.</HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Section>
          <SectionTitle>📋 Downloadable Recipe Cards</SectionTitle>
          <CardGrid>
            {recipeCards.map((card, index) => (
              <ResourceCard key={index}>
                <h3>{card.title}</h3>
                <DownloadButton href={card.file} download>
                  Download
                </DownloadButton>
              </ResourceCard>
            ))}
          </CardGrid>
        </Section>

        <Section>
          <SectionTitle>🎥 Cooking Tutorials</SectionTitle>
          <TutorialList>
            {tutorials.map((tutorial, index) => (
              <li key={index}>
                <a href={tutorial.videoUrl} target="_blank" rel="noopener noreferrer">
                  {tutorial.title}
                </a>
              </li>
            ))}
          </TutorialList>
        </Section>

        <Section>
          <SectionTitle>📚 Instructional Videos</SectionTitle>
          <VideoGrid>
            {instructionalVideos.map((video, index) => (
              <VideoCard key={index}>
                <iframe 
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <VideoTitle>{video.title}</VideoTitle>
              </VideoCard>
            ))}
          </VideoGrid>
        </Section>
      </PageContainer>

      {/* Footer outside the PageContainer */}
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


export default CulinaryResources;
