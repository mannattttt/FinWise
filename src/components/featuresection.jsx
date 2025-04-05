import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import FeatureBox from './feature';

const FeaturesSection = ({ visible }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const features = [
    {
      icon: "📖",
      title: "Learn",
      description: "Master the basics of banking, savings, and smart money management.",
      route: "/learn"
    },
    {
      icon: "✅",
      title: "Smart Eligibility Checker",
      description: "Assess your eligibility for loans, credit cards, and financial products.",
      route: "/eligibility-checker"
    },
    {
      icon: "🤖",
      title: "FinBot",
      description: "Get instant financial advice and personalized money-saving tips.",
      route: "/chatbot"
    },
    {
      icon: "🧮",
      title: "EMI Loan Calculator",
      description: "Calculate your monthly EMI for loans and plan your repayments smarter.",
      route: "/calculator"
    }
  ];

  const handleFeatureClick = (feature) => {
    if (feature.route) {
      // Check if user is signed in before navigating
      if (isSignedIn) {
        navigate(feature.route);
      } else {
        // Show the message that user must sign in first
        setMessage(`You must sign in first to access ${feature.title}`);
        setShowMessage(true);
        
        // Hide the message after 3 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    }
  };

  return (
    <section className={`text-center px-5 transition-all duration-800 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <h2 className="text-2xl font-bold text-white whitespace-nowrap mt-[-250px]">
        Unlock the Best Financial Tools with Your Smartest Companion
      </h2>
      <div className="flex justify-center gap-5 mt-8">
        {features.map((feature, index) => (
          <FeatureBox
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            onFeatureClick={() => handleFeatureClick(feature)}
          />
        ))}
      </div>
      
      {/* Authentication message */}
      {showMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg z-50 animate-fade-in-up">
          {message}
        </div>
      )}
    </section>
  );
};

export default FeaturesSection;