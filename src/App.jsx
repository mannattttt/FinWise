import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logo from './components/logo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/featuresection';
import GlobalStyles from './components/GlobalStyles';
import Chatbot from './components/chatbot';
import EnhancedEMICalculator from './components/emicalculator'
import BankingNewsComponent from "./components/articles";
import logo from "./assets/logo.png";

function App() {  
  const [showFeatures, setShowFeatures] = useState(false);

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "#", label: "About Us" },
    { href: "#", label: "Help" }
  ];

  const HomePage = () => (
    <main className="flex-grow flex flex-col items-center justify-center px-5 mt-32">
      <Hero />
      
      {/* Large spacer */}
      <div className="h-screen"></div>

      <FeaturesSection visible={showFeatures} />
    </main>
  );

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <GlobalStyles />
        <Logo src={logo} alt="FinWise Logo" />
        <Navbar links={navLinks} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatbot" element={<Chatbot fullPage={true} />} />
          <Route path="/calculator" element={<EnhancedEMICalculator fullPage={true} />} />
          <Route path="/articles" element={<BankingNewsComponent fullPage={true} />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;