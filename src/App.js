import React, { useState, useEffect } from "react";
import "./App.css"; // Ensure CSS file is linked correctly
import logo from "./logo.png"; // Import logo properly

function App() {
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const revealPosition = window.innerHeight * 0.8; // Scroll karne par hi dikhai de

      if (scrollPosition > revealPosition) {
        setShowFeatures(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Logo Section (Separate from Navbar) */}
      <div className="logo-container">
        <img src={logo} alt="FinWise Logo" className="logo" />
      </div>

      {/* Centered, Rounded Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Articles</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="content">
        {/* Landing Page Section */}
        <section className="hero">
          <h1 className="hero-title">
            <span className="hero-title-welcome">Welcome </span>
            <span className="hero-title-to">To </span>
            <span className="hero-title-finwise">FinWise</span>
          </h1>
          <p className="hero-subtitle">Your smart finance companion.</p>

          <div className="button-container">
            <button className="btn btn-primary">Get Started</button>
          </div>
        </section>

        {/* Bahut zyada space daal raha hoon taki ye next page jaisa lage */}
        <div className="large-spacer"></div>

       {/* Features Section (Appears on Scroll) */}
        <section className={`features-container ${showFeatures ? "visible" : ""}`}>
          <h2 className="features-title">
            Unlock the Best Financial Tools with Your Smartest Companion
          </h2>
          <div className="features-grid">
            <div className="feature-box">
              <i className="icon">📖</i> {/* Book Icon for Learning */}
              <h3>Learn</h3>
              <p>Master the basics of banking, savings, and smart money management.</p>
            </div>
            <div className="feature-box">
              <i className="icon">✅</i> {/* Checkmark Icon for Eligibility */}
              <h3>Smart Eligibility Checker</h3>
              <p>Assess your eligibility for loans, credit cards, and financial products.</p>
            </div>
            <div className="feature-box">
              <i className="icon">🤖</i> {/* Robot Icon for FinBot */}
              <h3>FinBot</h3>
              <p>Get instant financial advice and personalized money-saving tips.</p>
            </div>
            <div className="feature-box">
              <i className="icon">🧮</i> {/* Calculator Icon for EMI */}
              <h3>EMI Loan Calculator</h3>
              <p>Calculate your monthly EMI for loans and plan your repayments smarter.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
