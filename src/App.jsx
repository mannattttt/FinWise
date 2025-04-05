import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import Logo from './components/logo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/featuresection';
import GlobalStyles from './components/GlobalStyles';
import Chatbot from './components/chatbot';
import EnhancedEMICalculator from "./components/emicalculator";
import logo from "./assets/logo.png";

// These components would need to be created for each feature
const LearnPage = () => <div className="min-h-screen pt-24 px-8">Learn Page Content</div>;
const EligibilityChecker = () => <div className="min-h-screen pt-24 px-8">Smart Eligibility Checker Content</div>;
const LoanCalculator = () => <div className="min-h-screen pt-24 px-8">EMI Loan Calculator Content</div>;

function App() {  
  const [showFeatures, setShowFeatures] = useState(false);
  const { isSignedIn, user } = useUser();

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
    { href: "#", label: "Articles" },
    { href: "#", label: "Settings" },
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
          
          {/* Route for Learn feature - no protection */}
          <Route path="/learn" element={<LearnPage />} />
          
          {/* Route for Smart Eligibility Checker feature - no protection */}
          <Route path="/eligibility-checker" element={<EligibilityChecker />} />
          
          {/* Route for FinBot feature - no protection */}
          <Route path="/chatbot" element={<Chatbot fullPage={true} />} />
          
          {/* Route for EMI Loan Calculator feature - no protection */}
          <Route path="/calculator" element={<EnhancedEMICalculator/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;