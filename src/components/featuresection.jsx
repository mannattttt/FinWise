import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import FeatureBox from './feature';

const FeaturesSection = ({ visible }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [alertPosition, setAlertPosition] = useState({ top: 0, left: 0 });

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

  const handleFeatureClick = (feature, event) => {
    if (feature.route) {
      // Check if user is signed in before navigating
      if (isSignedIn) {
        navigate(feature.route);
      } else {
        // Calculate position for the alert based on the clicked element
        // Get the bounding rectangle of the clicked element
        const rect = event.currentTarget.getBoundingClientRect();
        
        // Position the alert to appear centered above the clicked feature
        setAlertPosition({
          top: rect.top - 40, // Position it 40px above the clicked element
          left: rect.left + rect.width / 2 // Center it horizontally
        });
        
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
    <section className={`text-center px-5 transition-all duration-800 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} relative`}>
      <div className='-translate-y-72'>
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
              onFeatureClick={(e) => handleFeatureClick(feature, e)}
            />
          ))}
        </div>
      </div>
      
{/* Authentication message - positioned to directly overlap the clicked feature */}
{showMessage && (
  <div 
    className="absolute bg-red-600 text-white py-2 px-4 rounded z-50"
    style={{
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute'
    }}
  >
    {message}
  </div>
)}
    </section>
  );
};

export default FeaturesSection;