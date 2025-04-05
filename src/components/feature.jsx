// FeatureBox.jsx
import React from 'react';

const FeatureBox = ({ icon, title, description, onFeatureClick }) => {
  return (
    <div 
      onClick={onFeatureClick}
      className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl text-white w-64 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
    >
      <span className="text-4xl mb-1">{icon}</span>
      <h3 className="text-lg font-bold m-0">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureBox;