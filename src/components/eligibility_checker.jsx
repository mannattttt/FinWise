import React, { useState, useRef, useEffect } from 'react';

const EnhancedFinancialEligibilityChecker = ({ fullPage = true }) => {
  // State variables to store user input
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [riskAppetite, setRiskAppetite] = useState('Moderate'); // For SIP recommendations

  // State to store eligibility results
  const [eligibilityResults, setEligibilityResults] = useState(null);

  // Improved NumberInput component with proper cursor position handling
  const NumberInput = ({ 
    value, 
    onChange, 
    placeholder, 
    maxLength = 15,
    allowCommas = true,
    prefix = '',
    type = 'text'
  }) => {
    const inputRef = useRef(null);
    const cursorPositionRef = useRef(null);
    const previousValueRef = useRef(value);
    
    // Handle cursor position and formatting
    useEffect(() => {
      if (inputRef.current && cursorPositionRef.current !== null) {
        const input = inputRef.current;
        
        // Calculate the cursor position adjustment
        let cursorPosition = cursorPositionRef.current;
        
        // If we've added commas that affect cursor position, adjust accordingly
        if (allowCommas && value) {
          const beforeCursorNewValue = value.substring(0, cursorPosition);
          const beforeCursorPrevValue = previousValueRef.current ? 
            previousValueRef.current.substring(0, cursorPosition) : '';
          
          // Count commas before cursor in both strings
          const commasInNewBeforeCursor = (beforeCursorNewValue.match(/,/g) || []).length;
          const commasInPrevBeforeCursor = (beforeCursorPrevValue.match(/,/g) || []).length;
          
          // Adjust cursor position based on comma difference
          cursorPosition += (commasInNewBeforeCursor - commasInPrevBeforeCursor);
        }
        
        // Apply the cursor position after the component has rendered
        setTimeout(() => {
          if (input) {
            input.setSelectionRange(cursorPosition, cursorPosition);
          }
        }, 0);
        
        cursorPositionRef.current = null;
      }
      previousValueRef.current = value;
    }, [value, allowCommas]);

    const handleChange = (e) => {
      const inputValue = e.target.value;
      
      // Save cursor position before any changes
      cursorPositionRef.current = e.target.selectionStart;

      // Remove non-numeric characters except commas
      let cleanValue = inputValue;
      if (prefix && cleanValue.startsWith(prefix)) {
        cleanValue = cleanValue.substring(prefix.length);
      }
      
      // Process input value
      cleanValue = allowCommas 
        ? cleanValue.replace(/[^0-9,]/g, '') 
        : cleanValue.replace(/[^0-9]/g, '');
      
      // Remove existing commas before processing
      const numericValue = cleanValue.replace(/,/g, '');
      
      // Limit length to maxLength
      const trimmedValue = numericValue.slice(0, maxLength);
      
      // Format with commas if allowed
      const formattedValue = allowCommas 
        ? trimmedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : trimmedValue;
      
      // Update value
      onChange(formattedValue);
    };
    

    return (
      <div className="relative">
        {prefix && (
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            {prefix}
          </span>
        )}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full px-2 py-2 border border-gray-300/50 rounded-lg bg-white/90 
            focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500
            ${prefix ? 'pl-6' : ''}`}
        />
      </div>
    );
  };

  // Credit Card Data
  const creditCards = [
    {
      name: "SBI Cashback Credit Card",
      category: "Basic",
      minIncome: 300000,
      minCreditScore: 650,
      benefits: "5% cashback on online spends, 1% on offline purchases",
      imageUrl: "src/assets/sbi_card.png"
    },
    {
      name: "ICICI Amazon Pay Card",
      category: "Basic",
      minIncome: 300000, 
      minCreditScore: 650,
      benefits: "5% return on Amazon spends, 1% on others",
      imageUrl: "src/assets/icici.png"
    },
    {
      name: "HDFC Regalia Gold",
      category: "Premium",
      minIncome: 1200000,
      minCreditScore: 700,
      benefits: "Airport lounge access, milestone benefits",
      imageUrl: "src/assets/hdfc.avif"
    },
    {
      name: "Axis Atlas Credit Card",
      category: "Travel",
      minIncome: 1200000,
      minCreditScore: 750,
      benefits: "Accor, ITC & airline transfer partners",
      imageUrl: "src/assets/axis.png"
    },
    {
      name: "Amex Platinum Travel",
      category: "Travel",
      minIncome: 1500000,
      minCreditScore: 750,
      benefits: "Taj Vouchers & premium airport lounges",
      imageUrl: "src/assets/amex.png"
    },
    {
      name: "HDFC Infinia",
      category: "Super Premium",
      minIncome: 2000000,
      minCreditScore: 800,
      benefits: "5X Rewards with high reward rate on spends",
      imageUrl: "src/assets/hdfc.avif"
    }
  ];

  // SIP recommendation data
  const sipOptions = {
    "Conservative": [
      { name: "HDFC Corporate Bond", type: "Debt", risk: "Low", returns: "7-8%", allocation: 40 },
      { name: "SBI Bluechip Fund", type: "Large Cap", risk: "Moderate", returns: "10-12%", allocation: 30 },
      { name: "Axis Liquid Fund", type: "Liquid", risk: "Very Low", returns: "5-6%", allocation: 30 }
    ],
    "Moderate": [
      { name: "Mirae Asset Large Cap", type: "Large Cap", risk: "Moderate", returns: "12-14%", allocation: 40 },
      { name: "Kotak Emerging Equity", type: "Mid Cap", risk: "Mid-High", returns: "15-18%", allocation: 30 },
      { name: "ICICI Corp Bond Fund", type: "Debt", risk: "Low", returns: "7-8%", allocation: 30 }
    ],
    "Aggressive": [
      { name: "Axis Midcap Fund", type: "Mid Cap", risk: "High", returns: "15-18%", allocation: 40 },
      { name: "SBI Small Cap Fund", type: "Small Cap", risk: "Very High", returns: "18-22%", allocation: 40 },
      { name: "Parag Parikh Flexi Cap", type: "Flexi Cap", risk: "High", returns: "14-16%", allocation: 20 }
    ]
  };

  // Calculate Eligibility function
  const calculateEligibility = () => {
    // Basic validation
    if (!age || !income || !employmentType || !creditScore) {
      alert('Please fill in all fields');
      return;
    }

    // Parse values, removing commas
    const parsedAge = parseInt(age.replace(/,/g, ''));
    const parsedIncome = parseFloat(income.replace(/,/g, ''));
    const parsedCreditScore = parseInt(creditScore.replace(/,/g, ''));

    // Eligibility logic
    const results = {
      creditCardEligibility: determineCreditCardEligibility(parsedAge, parsedIncome, parsedCreditScore),
      loanEligibility: determineLoanEligibility(parsedAge, parsedIncome, parsedCreditScore, employmentType),
      recommendedFinancialProducts: getRecommendedProducts(parsedAge, parsedIncome, employmentType),
      recommendedCreditCards: getRecommendedCreditCards(parsedIncome, parsedCreditScore),
      recommendedSIPs: getRecommendedSIPs(parsedAge, parsedIncome, riskAppetite)
    };

    setEligibilityResults(results);
  };

  // Find credit cards based on income and credit score
  const getRecommendedCreditCards = (income, creditScore) => {
    return creditCards
      .filter(card => income >= card.minIncome && creditScore >= card.minCreditScore)
      .sort((a, b) => b.minIncome - a.minIncome)
      .slice(0, 3);
  };

  // Get SIP recommendations based on age, income, and risk appetite
  const getRecommendedSIPs = (age, income, riskAppetite) => {
    const monthlySIP = calculateRecommendedSIPAmount(income);
    
    // Get the appropriate SIP allocation based on risk appetite
    const selectedSIPs = sipOptions[riskAppetite];
    
    // Calculate the amount for each SIP based on allocation percentage
    const recommendedSIPs = selectedSIPs.map(sip => ({
      ...sip,
      monthlyAmount: Math.round((sip.allocation / 100) * monthlySIP)
    }));
    
    return {
      totalMonthly: monthlySIP,
      sips: recommendedSIPs
    };
  };

  // Calculate recommended SIP amount (10-20% of monthly income based on age)
  const calculateRecommendedSIPAmount = (annualIncome) => {
    const monthlyIncome = annualIncome / 12;
    const percentage = age < 30 ? 0.2 : age < 40 ? 0.15 : 0.1;
    return Math.round(monthlyIncome * percentage);
  };

  // Existing methods for eligibility determination
  const determineCreditCardEligibility = (age, income, creditScore) => {
    if (age < 18) return 'Not Eligible';
    if (creditScore < 600) return 'Low Chance of Approval';
    
    if (income < 300000) return 'Basic Credit Card';
    if (income < 750000) return 'Mid-Tier Credit Card';
    if (income < 1200000) return 'Premium Credit Card';
    return 'Super Premium Credit Card';
  };

  const determineLoanEligibility = (age, income, creditScore, employmentType) => {
    if (age < 21 || age > 60) return 'Not Eligible';
    if (creditScore < 650) return 'Low Loan Amount';
    
    let maxLoanAmount = 0;
    switch(employmentType) {
      case 'Salaried':
        maxLoanAmount = income * 3;
        break;
      case 'Self-Employed':
        maxLoanAmount = income * 2.5;
        break;
      case 'Business':
        maxLoanAmount = income * 2;
        break;
      default:
        maxLoanAmount = income * 2;
    }

    return `Eligible for Loan up to ₹${maxLoanAmount.toLocaleString()}`;
  };

  const getRecommendedProducts = (age, income, employmentType) => {
    const products = [];

    // Age-based recommendations
    if (age < 30) {
      products.push('Student Savings Account');
      products.push('Youth Investment Plan');
    }

    // Income-based recommendations
    if (income < 500000) {
      products.push('Basic Savings Account');
    } else if (income < 1000000) {
      products.push('Mid-Income Portfolio');
    } else {
      products.push('HNI Investment Strategy');
    }

    // Employment-based recommendations
    switch(employmentType) {
      case 'Salaried':
        products.push('Salary-Based FD');
        break;
      case 'Self-Employed':
        products.push('Professional Loan');
        break;
      case 'Business':
        products.push('Business Growth Fund');
        break;
    }

    return products;
  };

  return (
    <div className="fixed inset-0 bg-black">
      <div className="w-full h-full p-4 flex flex-col">
        <div className="bg-gradient-to-r from-green-900 to-green-500 rounded-xl p-4 mb-4 shadow-lg">
          <h1 className="text-3xl font-bold text-white text-center">Smart Eligibility Checker</h1>
          <p className="text-center text-white text-opacity-80 mt-1">Personalized financial recommendations tailored just for you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 overflow-hidden">
          {/* Form Section - Made narrower */}
          <div className="md:col-span-4 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-3">Your Information</h2>
            <div className="grid gap-3">
              {/* Age Input */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Age</label>
                <NumberInput 
                  value={age} 
                  onChange={setAge}
                  placeholder="Enter age"
                  maxLength={3}
                />
              </div>

              {/* Income Input */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Annual Income</label>
                <NumberInput 
                  value={income} 
                  onChange={setIncome}
                  placeholder="Enter income"
                  prefix="₹"
                  maxLength={15}
                />
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Employment Type</label>
                <select 
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300/50 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                >
                  <option value="">Select an option</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              {/* Credit Score */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Credit Score</label>
                <NumberInput 
                  value={creditScore} 
                  onChange={setCreditScore}
                  placeholder="Enter score"
                  maxLength={3}
                />
              </div>

              {/* Risk Appetite */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Risk Appetite</label>
                <select 
                  value={riskAppetite}
                  onChange={(e) => setRiskAppetite(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300/50 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                >
                  <option value="Conservative">Conservative</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Aggressive">Aggressive</option>
                </select>
              </div>

              {/* Submit Button */}
              <button 
                onClick={calculateEligibility} 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors font-medium shadow-md mt-2"
              >
                Check Eligibility
              </button>
            </div>
          </div>

          {/* Results Section - Made scrollable but contained */}
          <div className="md:col-span-8 overflow-y-auto h-full">
            <div className="space-y-4">
              {/* Financial Eligibility Results */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Your Financial Summary</h3>
                {eligibilityResults ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-green-300 mb-1">Credit Card Status</h4>
                      <p className="text-white text-lg">{eligibilityResults.creditCardEligibility}</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-green-300 mb-1">Loan Status</h4>
                      <p className="text-white text-lg">{eligibilityResults.loanEligibility}</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-green-300 mb-1">Recommended SIP</h4>
                      <p className="text-white text-lg">{eligibilityResults?.recommendedSIPs?.totalMonthly ? `₹${eligibilityResults.recommendedSIPs.totalMonthly.toLocaleString()}/month` : 'N/A'}</p>
                    </div>
                    {eligibilityResults.recommendedFinancialProducts.map((product, index) => (
                      <div key={index} className="bg-white/20 p-3 rounded-lg">
                        <p className="font-medium text-lg">{product}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-24 text-center p-4">
                    <p className="text-gray-200">Enter your details and click "Check Eligibility"</p>
                  </div>
                )}
              </div>
                
              {/* Credit Card Recommendations */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Recommended Credit Cards</h3>
                {eligibilityResults?.recommendedCreditCards?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {eligibilityResults.recommendedCreditCards.map((card, index) => (
                      <div key={index} className="bg-white/20 rounded-lg p-3 transition-all hover:bg-white/30 cursor-pointer">
                        <div className="flex items-center space-x-2 mb-2">
                          <img src={card.imageUrl} alt={card.name} className="rounded w-12 h-8" />
                          <div>
                            <p className="font-medium text-green-200 text-xs">{card.category}</p>
                            <h4 className="font-semibold text-sm">{card.name}</h4>
                          </div>
                        </div>
                        <p className="text-xs text-gray-200">{card.benefits}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-24">
                    <p className="text-yellow-200 text-sm text-center">{eligibilityResults ? "No card recommendations at this time. Please improve your credit score or income to qualify." : "Enter your details to see credit card recommendations"}</p>
                  </div>
                )}
              </div>
                
              {/* SIP Recommendations */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white shadow-lg">
                <h3 className="text-xl font-semibold mb-3">SIP Recommendations</h3>
                {eligibilityResults?.recommendedSIPs ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {eligibilityResults.recommendedSIPs.sips.map((sip, index) => (
                      <div key={index} className="bg-white/20 rounded-lg p-3">
                        <h4 className="font-semibold text-lg">{sip.name}</h4>
                        <div className="mt-2 text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-200">Type:</span> 
                            <span className="text-white">{sip.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-200">Risk:</span> 
                            <span className="text-white">{sip.risk}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-200">Returns:</span> 
                            <span className="text-white">{sip.returns}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span className="text-green-200">Monthly:</span> 
                            <span className="text-white">₹{sip.monthlyAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-24">
                    <p className="text-gray-200 text-center">Enter your details to see SIP recommendations based on your risk profile</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFinancialEligibilityChecker;