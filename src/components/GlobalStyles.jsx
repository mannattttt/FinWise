// GlobalStyles.jsx
import React from 'react';

const GlobalStyles = () => {
  return (
    <style jsx>{`
      body {
        position: relative;
        background-color: #000000;
        min-height: 200vh;
        overflow-x: hidden;
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      
      body::after {
        content: "";
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 150vw;
        height: 30vh;
        background: radial-gradient(ellipse at bottom, rgba(0, 255, 85, 0.7) 20%, rgba(0, 0, 0, 1) 80%);
        border-radius: 50% 50% 0 0;
        z-index: -1;
        filter: blur(100px);
        pointer-events: none;
      }
    `}</style>
  );
};

export default GlobalStyles;