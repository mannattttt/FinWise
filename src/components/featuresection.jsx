import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureBox from './feature';

const FeaturesSection = ({ visible }) => {
  const navigate = useNavigate();

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
      route: "/finbot"
    },
    {
      icon: "🧮",
      title: "EMI Loan Calculator",
      description: "Calculate your monthly EMI for loans and plan your repayments smarter.",
      route: "/emi-calculator"
    }
  ];

  const handleFeatureClick = (route) => {
    // For FinBot, open in a new tab
    if (route === '/finbot') {
      window.open(route, '_blank', 'noopener,noreferrer');
    } else {
      // For other features, navigate within the app
      navigate(route);
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
            onFeatureClick={() => handleFeatureClick(feature.route)}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;