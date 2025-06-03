import React, { useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import components
import Navbar from "./components/Navbar";
import CookieBanner from './components/CookieBanner';
import Authentication from "./pages/Authentication"; // ✅ import this
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import RecipeCollection from "./pages/RecipeCollection";
import CommunityCookbook from "./pages/CommunityCookbook";
import ContactUs from "./pages/ContactUs";
import Privacy from "./components/Privacy";
import Cookies from "./components/Cookies";
import EducationalResources from "./pages/EducationalResources";
import CulinaryResources from "./pages/CulinaryResources";

// Import AuthContext
import { AuthProvider } from './context/AuthContext'; // ✅ Import the AuthProvider

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background || "#fff"};
  overflow-x: hidden;
  transition: all 0.2s ease;
`;

const App = () => {
  const [openSign, setOpenSign] = useState(false);   // ✅ controls modal visibility
  const [login, setLogin] = useState(true);          // ✅ true = SignIn, false = SignUp

  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider> {/* Wrap your app in AuthProvider to give all components access */}
        <BrowserRouter>
          <Container>
            <Navbar setOpenSign={setOpenSign} setLogin={setLogin} /> {/* Pass the necessary props */}
            <CookieBanner />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/recipe" element={<RecipeCollection />} />
              <Route path="/communitycookbook" element={<CommunityCookbook />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/culinaryresources" element={<CulinaryResources />} />
              <Route path="/educationalresources" element={<EducationalResources />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
            </Routes>

            {/* ✅ Auth modal mounted here and controlled via state */}
            <Authentication
              openSign={openSign}
              setOpenSign={setOpenSign}
              login={login}
              setLogin={setLogin}
            />
          </Container>
        </BrowserRouter>
      </AuthProvider> {/* End AuthProvider */}
    </ThemeProvider>
  );
};

export default App;
