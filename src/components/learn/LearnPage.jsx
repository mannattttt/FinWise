import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { basicTerms } from "../../Data/termsData"; // Make sure path is correct

const LearnPage = () => {
  // State to track selected category
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Get all available categories
  const categories = Object.keys(basicTerms);
  
  // Set initial selected category (first one in the list)
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    // Set background color to black, allow scrolling
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#000000"; // black background
    
    return () => {
      // Reset when unmounted
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15
      }
    }
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <motion.h2 
        className="text-4xl font-bold mb-6 text-white text-center uppercase tracking-wider"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        BASIC FINANCIAL TERMS
      </motion.h2>
      
      <motion.p
        className="text-lg text-gray-300 text-center mb-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Explore essential financial terminology across different categories to enhance your financial literacy.
      </motion.p>
      
      {/* Category Selection Buttons in a single line */}
      <motion.div 
        className="w-full max-w-6xl flex flex-row justify-center gap-4 mb-10 overflow-x-auto py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-6 py-3 rounded-full font-bold flex items-center justify-center text-lg transition-all duration-300 whitespace-nowrap ${
              selectedCategory === category 
                ? "bg-gradient-to-r from-green-500 to-blue-500 text-white" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => handleCategoryClick(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>
      
      {/* Selected Category Terms Section - Full Width */}
      {selectedCategory && (
        <motion.div 
          className="w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory} // Ensures re-animation when category changes
        >
          <motion.h3 
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-8 text-center"
            variants={itemVariants}
          >
            {selectedCategory}
          </motion.h3>
          
          <div className="space-y-6">
            {basicTerms[selectedCategory].map((item, itemIndex) => (
              <motion.div 
                key={itemIndex}
                className="p-6 rounded-xl transition-all duration-300 border-l-4 border-green-500/30 hover:border-green-500 bg-gradient-to-r from-gray-900 to-gray-800/30"
                whileHover={{ x: 5, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}
                variants={itemVariants}
              >
                <div className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-2">
                  {item.term}
                </div>
                <div className="text-gray-300 leading-relaxed">
                  {item.definition}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Button to navigate to Banking Dictionary */}
      <motion.div 
        className="mt-16 mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/learn/banking-terms">
          <motion.button 
            className="relative overflow-hidden bg-transparent text-green-400 font-bold py-3 px-8 rounded-full transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 group-hover:text-white">EXPLORE BANKING TERMS</span>
            <span 
              className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-full"
            />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default LearnPage;