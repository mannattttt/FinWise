// Logo.jsx
import React from 'react';

const Logo = ({ src, alt }) => {
  return (
    <div className="fixed top-[-15px] left-[-15px] z-50">
      <img 
        src={src} 
        alt={alt} 
        className="h-32 transition-transform duration-300 hover:scale-110" 
      />
    </div>
  );
};

export default Logo;