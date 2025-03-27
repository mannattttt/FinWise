import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import  { useEffect } from 'react';

const EMICalculator = () => {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Enables smooth scrolling
        });
      }, []);
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [tenureType, setTenureType] = useState('years');

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateEMI = () => {
    const tenureMonths = tenureType === 'years' ? tenure * 12 : tenure;
    const monthlyRate = interestRate / 12 / 100;

    const emi = principal * monthlyRate * 
      Math.pow(1 + monthlyRate, tenureMonths) / 
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalPaymentAmount = emi * tenureMonths;
    const totalInterestAmount = totalPaymentAmount - principal;

    setMonthlyEMI(emi);
    setTotalInterest(totalInterestAmount);
    setTotalPayment(totalPaymentAmount);
  };

  const pieChartData = [
    { name: 'Principal', value: principal },
    { name: 'Total Interest', value: totalInterest }
  ];

const COLORS = ['#2E8B57', '#4CAF50']; // Different Green Shades


  return (
    <div className="container mx-auto p-4 max-w-5xl mt-20">
        {/* Added EMI Calculator Heading */}
        <Card className="border-4 border-white shadow-lg rounded-lg">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-green-600 to-white text-center mt-12 mb-0">
                EMI Calculator
            </h1>
        <CardHeader>
          <CardTitle>EMI Calculator</CardTitle>
        </CardHeader>
            <hr className="border-2 border-white mb-6" />
        <CardContent>
          
          {/* Input Fields & Pie Chart in a Row */}
          <div className="flex justify-between items-start">
            
            {/* Input Fields (Left Side) */}
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block text-sm text-white font-medium mb-2">Principal Amount (₹)</label>
                <input 
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                  min="1000"
                  max="10000000"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white font-medium mb-2">Interest Rate (% per annum)</label>
                <input 
                  type="number"
                  
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                  step="0.1"
                  min="0"
                  max="30"
                />
              </div>

              <div className="mb-4 flex space-x-2">
                <div className="w-2/3">
                  <label className="block text-sm text-white font-medium mb-2">Loan Tenure</label>
                  <input 
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="30"
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm text-white font-medium mb-2">Tenure Type</label>
                  <select 
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              {/* Calculate Button */}
              <button 
                onClick={calculateEMI}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800 transition"
              >
                Calculate EMI
              </button>
            </div>

            {/* Pie Chart (Right Side) */}
            {totalInterest > 0 && (
              <div className="w-1/2 bg-white p-1 rounded shadow ml-[9px]">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Loan Breakup
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => 
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Amount']} />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Loan Details Below */}
          {totalInterest > 0 && (
            <div className="mt-6 bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="font-bold">₹{monthlyEMI.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="font-bold">₹{totalInterest.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Payment</p>
                  <p className="font-bold">₹{totalPayment.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
          
        </CardContent>
      </Card>
    </div>
  );
};

export default EMICalculator;
