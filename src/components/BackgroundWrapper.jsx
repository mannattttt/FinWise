import React from 'react';
import { Squares } from './Squares';

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Squares background that covers the entire app */}
      <div className="fixed inset-0 z-0">
        <Squares 
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(34, 197, 94, 0.2)"
          squareSize={60}
          hoverFillColor="rgba(34, 197, 94, 0.1)"
        />
      </div>
      
      {/* Green radial gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-radial from-green-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;