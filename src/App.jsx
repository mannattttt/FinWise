import React, { useState, useEffect, useRef } from "react";
import Logo from './components/logo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/featuresection';
import GlobalStyles from './components/GlobalStyles';
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
    { href: "#", label: "Home" },
    { href: "#", label: "Articles" },
    { href: "#", label: "Settings" },
    { href: "#", label: "Help" }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <GlobalStyles />
      <Logo src={logo} alt="FinWise Logo" />
      <Navbar links={navLinks} />

      <main className="flex-grow flex flex-col items-center justify-center px-5 mt-32">
        {/* Pass scrollToFeatures to Hero component */}
        <Hero onGetStartedClick={scrollToFeatures} />
        
        {/* Large spacer */}
        <div className="h-screen"></div>

        {/* Add ref to FeaturesSection */}
        <div ref={featuresRef}>
          <FeaturesSection visible={showFeatures} />
        </div>
      </main>
    </div>
  );
}

export default App;