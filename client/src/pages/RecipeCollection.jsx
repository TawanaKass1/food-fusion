import React, { useState } from 'react';
import styled from 'styled-components';
import Recipe1 from '../utils/Images/recipe1.jpg';
import Recipe2 from '../utils/Images/recipe2.jpg';
import Recipe3 from '../utils/Images/recipe3.jpg';
import Recipe4 from '../utils/Images/recipe4.jpg';
import Recipe5 from '../utils/Images/recipe5.jpg';
import Logo from "../utils/Images/foodfusion.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
const recipes = [
  {
    name: "Spicy Thai Noodles",
    images: [Recipe1],
    description: ["Packed with chili and garlic", "Crunchy peanuts", "100% plant-based"],
    ingredients: ["200g rice noodles", "2 tbsp soy sauce", "1 tbsp sesame oil", "2 cloves garlic"],
    steps: ["Soak noodles", "Sauté garlic & chili", "Mix in sauce and noodles"],
  },
  {
    name: "Creamy Mushroom Risotto",
    images: [Recipe2],
    description: ["Rich and creamy", "Perfect for cold nights"],
    ingredients: ["Arborio rice", "Mushrooms", "Vegetable broth", "Parmesan"],
    steps: ["Sauté mushrooms", "Add rice", "Stir in broth gradually"],
  },
  {
    name: "Mexican Street Corn",
    images: [Recipe3],
    description: ["Smoky, cheesy, and tangy"],
    ingredients: ["Corn", "Mayonnaise", "Cotija cheese", "Chili powder"],
    steps: ["Grill corn", "Slather mayo mix", "Sprinkle cheese and chili"],
  },
  {
    name: "Italian Pasta Salad",
    images: [Recipe4],
    description: ["Cool and refreshing", "Packed with veggies"],
    ingredients: ["Pasta", "Tomatoes", "Cucumber", "Feta cheese"],
    steps: ["Cook pasta", "Chop veggies", "Toss with dressing"],
  },
  {
    name: "Chickpea Curry",
    images: [Recipe5],
    description: ["Hearty and comforting", "Full of protein"],
    ingredients: ["Chickpeas", "Tomatoes", "Coconut milk", "Spices"],
    steps: ["Cook onions", "Add spices", "Simmer with chickpeas"],
  }
];

const RECIPES_PER_PAGE = 3;

const RecipeCollection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecipe = currentPage * RECIPES_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - RECIPES_PER_PAGE;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);

  return (
    <Container>
      <CardWrapper>
        {currentRecipes.map((recipe, index) => (
          <RecipeCard key={index}>
            <img src={recipe.images[0]} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <ul>
              {recipe.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
               {recipe.ingredients.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
              {recipe.steps.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </RecipeCard>
        ))}
      </CardWrapper>

      <Pagination>
        <PageButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
          <svg width="9" height="13" viewBox="0 0 9 13" fill="none">
            <path d="M8 1 2 6.667 8 12" stroke="#111820" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Prev</span>
        </PageButton>

        {Array.from({ length: totalPages }, (_, i) => (
          <PageNumber
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageNumber>
        ))}

        <PageButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
          <span>Next</span>
          <svg width="9" height="13" viewBox="0 0 9 13" fill="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M8 1 2 6.667 8 12" stroke="#111820" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </PageButton>
      </Pagination>
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
                      <FooterLink href="/cookies">Cookies Policy</FooterLink>
    

                      </BottomLinks>
                    </FooterBottom>
                  </FooterWrapper>
    </Container>
  );
};

export default RecipeCollection;

//Styled Components
const Container = styled.div`
  max-width: 90%;
  margin: auto;
  padding: 40px 20px;
  
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

const RecipeCard = styled.div`
  width: 280px;
  background: #e5cfb5;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 16px;
  text-align: center;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    margin-top: 12px;
    font-size: 1.25rem;
    color: #111827;
  }

  ul {
    list-style: disc;
    text-align: left;
    margin: 12px 0 0 20px;
    color: #4b5563;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  gap: 8px;
  color: #6b7280;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 14px;

  svg {
    margin-top: 2px;
  }

  &:hover {
    color: grey;
  }
`;

const PageNumber = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: ${({ active }) => (active ? '2px solid #442a00' : '1px solid #d1d5db')};
  color: ${({ active }) => (active ? 'black' : 'black')};
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;
const FooterWrapper = styled.footer`
  width: 100%;
  background-color: white;
  padding: 40px 24px 20px;
  color: #4b5563;
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