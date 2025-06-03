


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeroImg from "../utils/Images/community.jpg";
import ChildImg from "../utils/Images/sample-dish.jpg";
import Logo from "../utils/Images/foodfusion.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  background: #e5cfb5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 500px;
  background: url(${HeroImg}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

const HeroText = styled.div`
  max-width: 800px;
  font-size: 32px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.5);
  padding: 24px;
  border-radius: 16px;
`;

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 60px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
`;

const ContentBox = styled.div`
  flex: wrap;
  border-radius: 12px;
  min-width: 280px;
  max-width: 500px;
  background: #e5cfb5;
  box-shadow: 1px 20px 35px 0px #442a00;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.primary};
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const UploadForm = styled.form`
  width: 100%;
  max-width: 700px;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}30;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  min-height: 120px;
  resize: vertical;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}30;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const SubmitButton = styled.button`
  padding: 14px;
  background-color: #442a00;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
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
  margin-top: 5px;
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

const FooterContainer = styled.div`
  border-top: 1px solid #d1d5db;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
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

  @media (min-width: 768px) {
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

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: white;
  padding: 40px 24px 20px;
  color: #4b5563;
`;

const CommunityCookbook = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    recipeImage: null,
  });
  const [recipes, setRecipes] = useState([]);

  // Fetch existing recipes from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, recipeImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append("recipeName", formData.recipeName);
    submissionData.append("ingredients", formData.ingredients);
    submissionData.append("instructions", formData.instructions);
    if (formData.recipeImage) {
      submissionData.append("recipeImage", formData.recipeImage);
    }

    fetch("http://localhost:8080/api/recipes", {
      method: "POST",
      body: submissionData,
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes([...recipes, data]);
        setFormData({
          recipeName: "",
          ingredients: "",
          instructions: "",
          recipeImage: null,
        });
        setImagePreview(null);
      })
      .catch((err) => console.error("Error submitting recipe:", err));
  };

  return (
    <Container>
      <HeroSection>
        <HeroText>
          Share your favorite recipes, tips, and experiences with the FoodFusion
          community!
        </HeroText>
      </HeroSection>

      <Section>
        <ContentBox>
          <Title>Cooking Together</Title>
          <Text>
            Discover a variety of home-cooked recipes submitted by our members.
            From traditional dishes to modern twists—our community brings the
            flavor.
          </Text>
        </ContentBox>
        <ContentBox>
          <Image src={ChildImg} alt="Happy child in kitchen" />
        </ContentBox>
      </Section>

      <Section>
        <ContentBox>
          <Title>Contribute Your Flavor</Title>
          <Text>
            Got a recipe passed down through generations? Or maybe a quick hack
            for perfect pasta? Share it and let the world taste your creativity.
          </Text>
        </ContentBox>
      </Section>

      <Section>
        <UploadForm onSubmit={handleSubmit}>
          <Label htmlFor="recipeName">Recipe Name</Label>
          <Input
            type="text"
            id="recipeName"
            value={formData.recipeName}
            onChange={handleChange}
            placeholder="e.g. Grandma's Banana Bread"
            required
          />

          <Label htmlFor="recipeImage">Upload Dish Image</Label>
          <Input
            type="file"
            id="recipeImage"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}

          <Label htmlFor="ingredients">Ingredients</Label>
          <TextArea
            id="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="List ingredients here..."
            required
          />

          <Label htmlFor="instructions">Instructions</Label>
          <TextArea
            id="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Step-by-step cooking instructions..."
            required
          />

          <SubmitButton type="submit">Share Recipe</SubmitButton>
        </UploadForm>
      </Section>

      <Section>
        {recipes.map((recipe, index) => (
          <ContentBox key={index}>
            <Title>{recipe.recipeName}</Title>
            {recipe.imageUrl && (
              <Image src={recipe.imageUrl} alt={recipe.recipeName} />
            )}
            <Text><strong>Ingredients:</strong> {recipe.ingredients}</Text>
            <Text><strong>Instructions:</strong> {recipe.instructions}</Text>
          </ContentBox>
        ))}
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
                              < FooterLink to="/about">About</FooterLink>
                            <FooterLink to="/recipe">Recipes</FooterLink>
                            <FooterLink to="/communitycookbook">Community</FooterLink>
                            <FooterLink to="/contact">Contact</FooterLink>
                            <FooterLink to="/culinaryresources">Culinary</FooterLink>
                            <FooterLink to="/educationalresources">Educational</FooterLink>
                            </FooterColumn>
                  
                            <FooterColumn>
                              <FooterTitle>SUPPORT</FooterTitle>
                              <FooterLink to="/contact">Contact Us</FooterLink>
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
                      <     FooterLink href="/cookies">Cookies Policy</FooterLink>
    
                            </BottomLinks>
                          </FooterBottom>
                        </FooterWrapper>
    </Container>
  );
};

       
    

export default CommunityCookbook;