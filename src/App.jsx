import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Logo from './components/logo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/featuresection';
import GlobalStyles from './components/GlobalStyles';
import Chatbot from './components/chatbot';
import EnhancedEMICalculator from './components/emicalculator'
import BankingNewsComponent from "./components/articles";
import logo from "./assets/logo.png";

// Create a wrapper component that conditionally renders the navbar
const AppLayout = ({ children, links }) => {
  const location = useLocation();
  const isChatbotRoute = location.pathname === "/chatbot";
  
  return (
    <>
      {!isChatbotRoute && <Logo src={logo} alt="FinWise Logo" />}
      {!isChatbotRoute && <Navbar links={links} />}
      {children}
    </>
  );
};

function App() {  
  const [showFeatures, setShowFeatures] = useState(false);
  const featuresRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const revealPosition = window.innerHeight * 0.8;

      if (scrollPosition > revealPosition) {
        setShowFeatures(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "#", label: "About Us" },
    { href: "#", label: "Help" }
  ];

  const HomePage = () => (
    <main className="flex-grow flex flex-col items-center justify-center px-5 mt-32">
      <Hero onGetStartedClick={scrollToFeatures} />
      
      {/* Large spacer */}
      <div className="h-screen"></div>

      <div ref={featuresRef}>
        <FeaturesSection visible={showFeatures} />
      </div>
    </main>
  );

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <GlobalStyles />
        <Routes>
          <Route path="/" element={
            <AppLayout links={navLinks}>
              <HomePage />
            </AppLayout>
          } />
          <Route path="/chatbot" element={<Chatbot fullPage={true} />} />
          <Route path="/calculator" element={<EnhancedEMICalculator fullPage={true} />} />
          <Route path="/articles" element={<BankingNewsComponent fullPage={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;