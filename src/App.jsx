import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import Logo from './components/logo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/featuresection';
import GlobalStyles from './components/GlobalStyles';
import Chatbot from './components/chatbot';
import EnhancedEMICalculator from './components/emicalculator';
import LearnPage from './components/learn/LearnPage';
import BankingTermsPage from './components/learn/BankingTermsPage';
import logo from "./assets/logo.png";
import BankingNewsComponent from "./components/articles";
import EnhancedFinancialEligibilityChecker from "./components/eligibility_checker";
import AboutUs from "./components/AboutUs";
import HelpButton from './components/HelpButton';

// Protected Route component to check authentication
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  
  // Show loading or nothing while clerk is loading
  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  // Redirect to home if not signed in
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// 🔁 ScrollToTop component defined inside App.js
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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
    { href: "/AboutUs", label: "About Us" },
    { href: "/HelpButton", label: "Help" }
  ];

  const HomePage = () => (
    <main className="flex-grow flex flex-col items-center justify-center px-5 mt-32">
      <Hero scrollToFeatures={scrollToFeatures} />
      
      {/* Large spacer */}
      <div className="h-screen"></div>
      <div ref={featuresRef}>
        <FeaturesSection visible={showFeatures} />
      </div>
    </main>
  );

  return (
    <Router>
      <ScrollToTop /> {/* 👈 Automatically scroll to top on every route change */}
      <div className="min-h-screen flex flex-col relative">
        <GlobalStyles />
        <Routes>
          <Route path="/" element={
            <AppLayout links={navLinks}>
              <HomePage />
            </AppLayout>
          } />
          <Route path="/chatbot" element={
            <ProtectedRoute>
              <Chatbot fullPage={true} />
            </ProtectedRoute>
          } />
          <Route path="/calculator" element={
            <ProtectedRoute>
              <EnhancedEMICalculator fullPage={true} />
            </ProtectedRoute>
          } />
          <Route path="/learn" element={
            <ProtectedRoute>
              <LearnPage />
            </ProtectedRoute>
          } />
          <Route path="/eligibility-checker" element={
            <ProtectedRoute>
              <EnhancedFinancialEligibilityChecker />
            </ProtectedRoute>
          } />
          <Route path="/learn/banking-terms" element={
            <ProtectedRoute>
              <BankingTermsPage />
            </ProtectedRoute>
          } />
          <Route path="/articles" element={
              <BankingNewsComponent />
          } />
          <Route path="/AboutUs" element={
            <AppLayout links={navLinks}>
              <AboutUs />
            </AppLayout>
          } />
          <Route path="/HelpButton" element={
            <AppLayout links={navLinks}>
              <HelpButton/>
            </AppLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;