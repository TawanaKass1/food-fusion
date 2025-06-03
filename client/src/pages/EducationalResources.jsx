import React from 'react';
import styled from 'styled-components';
import RenewableBasics from '../assets/pdfs/renewable_basics.pdf';
import SolarEnergyGuide from '../assets/pdfs/solar_energy_guide.pdf';
import WindEnergyInfographic from '../utils/Images/wind_infographic.jpg'; // placeholder images
import SolarEnergyInfographic from '../utils/Images/solar_infographic.jpg';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Logo from '../utils/Images/foodfusion.png'; // adjust if different
import HeroBackground from '../utils/Images/renewable_hero.jpg'; // a nice renewable energy background

const resources = [
  { title: "Renewable Energy Basics", file: RenewableBasics },
  { title: "Solar Energy Guide", file: SolarEnergyGuide },
];

const infographics = [
  { title: "Wind Energy Explained", imageUrl: WindEnergyInfographic },
  { title: "Solar Power Potential", imageUrl: SolarEnergyInfographic },
];

const videos = [
  { title: "Renewable Energy 101 | National Geographic", videoUrl: "https://www.youtube.com/embed/1kUE0BZtTRc" },
  { title: "How Solar Panels Work | TED-Ed", videoUrl: "https://www.youtube.com/embed/xKxrkht7CpY" },
  { title: "Wind Energy Explained | SciShow", videoUrl: "https://www.youtube.com/embed/niZ_cvu9Fts" }
];

const EducationalResources = () => {
  return (
    <>
      <PageContainer>
        <HeroSection>
          <HeroContent>
            <HeroTitle>Educational Resources</HeroTitle>
            <HeroSubtitle>Learn about renewable energy with downloadable guides, infographics, and videos.</HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Section>
          <SectionTitle>📄 Downloadable Resources</SectionTitle>
          <ResourceGrid>
            {resources.map((resource, index) => (
              <ResourceCard key={index}>
                <h3>{resource.title}</h3>
                <DownloadButton href={resource.file} download>Download PDF</DownloadButton>
              </ResourceCard>
            ))}
          </ResourceGrid>
        </Section>

        <Section>
          <SectionTitle>📊 Infographics</SectionTitle>
          <InfographicGrid>
            {infographics.map((infographic, index) => (
              <InfographicCard key={index}>
                <img src={infographic.imageUrl} alt={infographic.title} />
                <h4>{infographic.title}</h4>
              </InfographicCard>
            ))}
          </InfographicGrid>
        </Section>

        <Section>
          <SectionTitle>🎥 Educational Videos</SectionTitle>
          <VideoGrid>
            {videos.map((video, index) => (
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
            <p>Subscribe to our newsletter for updates and tips.</p>
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
  padding: 40px 60px;
  border-radius: 20px;
  display: inline-block;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
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

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
`;

const ResourceCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-bottom: 16px;
    font-size: 1.25rem;
    color: #374151;
  }
`;

const DownloadButton = styled.a`
  background-color: #442a00;
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: grey;
  }
`;

const InfographicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const InfographicCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  h4 {
    padding: 16px;
    font-size: 1.2rem;
    text-align: center;
    color: #374151;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`;

const VideoCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

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
// Footer styles
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
export default EducationalResources;