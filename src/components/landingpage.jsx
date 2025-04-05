import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import FeaturesSection from "./featuresection"

const LandingPage = () => {
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

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-5 mt-32">
      <Hero />
      {/* Large spacer */}
      <div className="h-screen"></div>
      <FeaturesSection visible={showFeatures} />
    </main>
  );
};

export default LandingPage;