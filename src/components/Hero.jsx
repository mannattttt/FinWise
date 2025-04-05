import { useClerk } from '@clerk/clerk-react';
import React from 'react';
import Navbar from './Navbar';

const Hero = ({ onGetStartedClick }) => {
  const { openSignIn } = useClerk();
  return (
    <section className="text-center max-w-full px-4">
        <Navbar/>
      <h1 className="text-7xl md:text-8xl font-extrabold leading-tight mb-4 mt-20 whitespace-nowrap">
        <span className="text-white">Welcome </span>
        <span className="bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">To </span>
        <span className="bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent">FinWise</span>
      </h1>
      <p className="text-2xl text-gray-400 mb-10">Your smart finance companion.</p>

      <div className="flex justify-center mt-8">
        <button 
          onClick={onGetStartedClick}
          className="px-8 py-4 border border-green-500 rounded-full bg-gray-800 text-white text-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-700 active:scale-95"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;