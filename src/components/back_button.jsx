import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-10 left-8 p-2 rounded-full hover:bg-black focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
      aria-label="Back to home"
    >
      <ChevronLeft size={32} className="text-white" />
    </button>
  );
};

export default BackButton;