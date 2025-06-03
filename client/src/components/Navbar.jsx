import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { NavLink, useNavigate } from 'react-router-dom';
import LogoImg from "../utils/Images/foodfusion.png";
import Button from "./Button";
import { MenuRounded, SearchRounded } from "@mui/icons-material";
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg || "#fff"};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
`;

const Logo = styled.img`
  height: 84px;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 28px;
  align-items: center;
  padding: 0 6px;
  color: black;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: black;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    color: grey;
  }

  &.active {
    color: #442a00;
    border-bottom: 1.8px solid #c25700;
  }
`;

const MobileIcon = styled.div`
  color: black;
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileIcons = styled.div`
  color: black;
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  list-style: none;
  width: 80%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light || "#ffffff"};
  position: absolute;
  top: 80px;
  right: 0;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
  transition: all 0.6s ease-in-out;
`;

const Navbar = ({ setOpenSign, setLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, login, logout } = useContext(AuthContext); // Use AuthContext for authentication
  const navigate = useNavigate();

  const openSignIn = () => {
    setLogin(true);
    setOpenSign(true);
  };

  const openSignUp = () => {
    setLogin(false);
    setOpenSign(true);
  };

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate('/signin');  // Redirect to SignIn page
  };

  return (
    <Nav>
      <NavbarContainer>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavLogo>
          <Logo src={LogoImg} alt="FoodFusion Logo" />
        </NavLogo>

        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/about">About</Navlink>
          <Navlink to="/recipe">Recipes</Navlink>
          <Navlink to="/communitycookbook">Community</Navlink>
          <Navlink to="/contact">Contact</Navlink>
          <Navlink to="/culinaryresources">Culinary</Navlink>
          <Navlink to="/educationalresources">Educational</Navlink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <Navlink to="/" onClick={() => setIsOpen(false)}>Home</Navlink>
            <Navlink to="/about" onClick={() => setIsOpen(false)}>About</Navlink>
            <Navlink to="/recipe" onClick={() => setIsOpen(false)}>Recipes</Navlink>
            <Navlink to="/communitycookbook" onClick={() => setIsOpen(false)}>Community</Navlink>
            <Navlink to="/contact" onClick={() => setIsOpen(false)}>Contact</Navlink>
            <Navlink to="/culinaryresources" onClick={() => setIsOpen(false)}>Culinary</Navlink>
            <Navlink to="/educationalresources" onClick={() => setIsOpen(false)}>Educational</Navlink>

            <div style={{ flex: 1, display: "flex", gap: "12px" }}>
              <Button text="Join Now" small onClick={() => { setIsOpen(false); openSignUp(); }} />
              <Button text="Sign In" small onClick={() => { setIsOpen(false); openSignIn(); }} />
            </div>
          </MobileMenu>
        )}

        <MobileIcons>
          <Navlink to="/search">
            <SearchRounded sx={{ color: "inherit", fontSize: "16px" }} />
          </Navlink>
        </MobileIcons>

        <ButtonContainer>
          <Navlink to="/search">
            <SearchRounded sx={{ color: "inherit", fontSize: "16px" }} />
          </Navlink>
          {isAuthenticated ? (
            <Button text="Log Out" small onClick={handleLogout} />
          ) : (
            <Button text="Sign In" small onClick={openSignIn} />
          )}
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
