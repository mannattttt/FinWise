import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Logo from './components/logo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/featuresection';
import GlobalStyles from './components/GlobalStyles';
import Chatbot from './components/chatbot';

// Import placeholder pages for features
// import LearnPage from './pages/LearnPage';
// import EligibilityCheckerPage from './pages/EligibilityCheckerPage';
// import EMICalculatorPage from './pages/EMICalculatorPage';

// Import assets
import logo from "./assets/logo.png";

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
    { href: "#", label: "Articles" },
    { href: "#", label: "Settings" },
    { href: "#", label: "Help" }
  ];

  const HomePage = () => (
    <main className="flex-grow flex flex-col items-center justify-center px-5 mt-32">
      <Hero onGetStartedClick={scrollToFeatures} />
      
      {/* Large spacer */}
      <div className="h-screen"></div>

      {/* Add ref to FeaturesSection */}
      <div ref={featuresRef}>
        <FeaturesSection visible={showFeatures} />
      </div>
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
          {/* <Route path="/learn" element={<LearnPage />} />
          <Route path="/eligibility-checker" element={<EligibilityCheckerPage />} />
          <Route path="/emi-calculator" element={<EMICalculatorPage />} /> */}
          <Route path="/finbot" element={<Chatbot fullPage={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;