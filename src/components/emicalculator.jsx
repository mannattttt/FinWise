import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, RefreshCw, CreditCard, Clock, PieChart as PieChartIcon, BarChart as BarChartIcon, Table as TableIcon } from 'lucide-react';

// Custom Card components instead of using shadcn/ui
const CustomCard = ({ className, children }) => {
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      {children}
    </div>
  );
};

const CustomCardHeader = ({ className, children }) => {
  return (
    <div className={`px-4 py-3 ${className}`}>
      {children}
    </div>
  );
};

const CustomCardTitle = ({ className, children }) => {
  return (
    <h3 className={`font-bold text-lg ${className}`}>
      {children}
    </h3>
  );
};

const CustomCardContent = ({ className, children }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

const EnhancedEMICalculator = () => {
  // State for loan details
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureType, setTenureType] = useState('years'); // Can retain default for selection

  // State for prepayment options
  const [prepaymentAmount, setPrepaymentAmount] = useState('');
  const [prepaymentMonth, setPrepaymentMonth] = useState('');
  const [prepaymentFrequency, setPrepaymentFrequency] = useState('one-time'); // Can retain default

  // State for results
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  
  // State for advanced features
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [prepaymentSchedule, setPrepaymentSchedule] = useState([]);
  const [prepaymentImpact, setPrepaymentImpact] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');

  // Calculate EMI and loan details
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
    
    // Generate amortization schedule
    let remainingPrincipal = principal;
    const schedule = [];
    let cumulativeInterest = 0;

    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = emi - interestPayment;
      
      cumulativeInterest += interestPayment;
      remainingPrincipal -= principalPayment;

      schedule.push({
        month,
        principalPayment,
        interestPayment,
        emi,
        remainingPrincipal: Math.max(0, remainingPrincipal),
        cumulativeInterest
      });
    }

    setAmortizationSchedule(schedule);
    calculatePrepayment(schedule, emi, tenureMonths, monthlyRate);
  };

  // Calculate prepayment impact
  const calculatePrepayment = (originalSchedule, originalEMI, tenureMonths, monthlyRate) => {
    if (!prepaymentAmount || !prepaymentMonth) return;

    let currentRemainingPrincipal = principal;
    const prepaymentScheduleData = [];
    let cumulativePrepaymentInterest = 0;
    
    // Function to apply prepayment based on frequency
    const shouldApplyPrepayment = (month) => {
      if (prepaymentFrequency === 'one-time') {
        return month === Number(prepaymentMonth);
      } else if (prepaymentFrequency === 'yearly') {
        return month > 0 && month % 12 === Number(prepaymentMonth) % 12;
      } else if (prepaymentFrequency === 'monthly') {
        return month >= Number(prepaymentMonth);
      }
      return false;
    };

    for (let month = 1; month <= tenureMonths; month++) {
      // Apply prepayment based on frequency
      if (shouldApplyPrepayment(month)) {
        currentRemainingPrincipal -= Number(prepaymentAmount);
        if (currentRemainingPrincipal <= 0) {
          currentRemainingPrincipal = 0;
        }
      }

      const interestPayment = currentRemainingPrincipal * monthlyRate;
      const principalPayment = Math.min(originalEMI - interestPayment, currentRemainingPrincipal);
      
      cumulativePrepaymentInterest += interestPayment;
      currentRemainingPrincipal -= principalPayment;

      prepaymentScheduleData.push({
        month,
        principalPayment,
        interestPayment,
        emi: originalEMI,
        remainingPrincipal: Math.max(0, currentRemainingPrincipal),
        cumulativeInterest: cumulativePrepaymentInterest,
        prepayment: shouldApplyPrepayment(month) ? Number(prepaymentAmount) : 0
      });

      // Stop if principal is fully paid
      if (currentRemainingPrincipal <= 0) break;
    }

    const monthsWithPrepayment = prepaymentScheduleData.length;
    const monthsSaved = tenureMonths - monthsWithPrepayment;
    const interestSaved = totalInterest - cumulativePrepaymentInterest;
    const newTotalPayment = (originalEMI * monthsWithPrepayment) + 
      (prepaymentFrequency === 'one-time' ? Number(prepaymentAmount) : 
       prepaymentFrequency === 'yearly' ? Math.ceil(monthsWithPrepayment / 12) * Number(prepaymentAmount) : 
       (monthsWithPrepayment - prepaymentMonth + 1) * Number(prepaymentAmount));

    setPrepaymentSchedule(prepaymentScheduleData);
    setPrepaymentImpact({
      monthsWithPrepayment,
      monthsSaved: monthsSaved > 0 ? monthsSaved : 0,
      interestSaved: interestSaved > 0 ? interestSaved.toFixed(2) : 0,
      newTotalPayment: newTotalPayment
    });
  };

  // Calculate on input change
  useEffect(() => {
    calculateEMI();
  }, [principal, interestRate, tenure, tenureType, prepaymentAmount, prepaymentMonth, prepaymentFrequency]);

  // Data for pie charts
  const loanBreakupData = [
    { name: 'Principal', value: principal },
    { name: 'Total Interest', value: totalInterest }
  ];
  
  const prepaymentComparisonData = [
    { name: 'Without Prepayment', value: totalInterest },
    { name: 'With Prepayment', value: prepaymentImpact ? totalInterest - prepaymentImpact.interestSaved : totalInterest }
  ];
  
  const COLORS = ['#2E8B57', '#4CAF50'];
  const COMPARE_COLORS = ['#FF6384', '#36A2EB'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Advanced EMI Calculator
          </h1>
          <p className="text-gray-400 mt-2">Calculate, analyze, and optimize your loan repayments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <CustomCard className="bg-gray-800 border border-gray-700 shadow-xl">
              <CustomCardHeader className="border-b border-gray-700">
                <CustomCardTitle className="text-white flex items-center">
                  <Calculator className="mr-2 text-green-400" />
                  Loan Details
                </CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2 flex items-center">
                    <CreditCard className="mr-2 text-green-400" size={16} />
                    Principal Amount (₹)
                  </label>
                  <input 
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-green-500"
                    min="1000"
                    max="10000000"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2 flex items-center">
                    <RefreshCw className="mr-2 text-green-400" size={16} />
                    Interest Rate (% per annum)
                  </label>
                  <input 
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-green-500"
                    step="0.1"
                    min="0"
                    max="30"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2 flex items-center">
                    <Clock className="mr-2 text-green-400" size={16} />
                    Loan Tenure
                  </label>
                  <div className="flex space-x-2">
                    <input 
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-2/3 bg-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-green-500"
                      min="1"
                      max="30"
                    />
                    <select 
                      value={tenureType}
                      onChange={(e) => setTenureType(e.target.value)}
                      className="w-1/3 bg-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-green-500"
                    >
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                {/* Prepayment Options */}
                <div className="mt-6 bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-4 flex items-center">
                    <PieChartIcon className="mr-2 text-green-400" size={16} />
                    Prepayment Options
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Prepayment Amount (₹)</label>
                      <input 
                        type="number"
                        value={prepaymentAmount}
                        onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                        className="w-full bg-gray-600 text-white rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Starting Month</label>
                      <input 
                        type="number"
                        value={prepaymentMonth}
                        onChange={(e) => setPrepaymentMonth(Number(e.target.value))}
                        className="w-full bg-gray-600 text-white rounded p-2"
                        min="1"
                        max={tenureType === 'years' ? tenure * 12 : tenure}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Frequency</label>
                      <select 
                        value={prepaymentFrequency}
                        onChange={(e) => setPrepaymentFrequency(e.target.value)}
                        className="w-full bg-gray-600 text-white rounded p-2"
                      >
                        <option value="one-time">One-time</option>
                        <option value="yearly">Yearly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CustomCardContent>
            </CustomCard>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <CustomCard className="bg-gray-800 border border-gray-700">
                <CustomCardContent className="p-4 text-center">
                  <p className="text-sm text-gray-400">Monthly EMI</p>
                  <p className="text-xl font-bold text-green-400">₹{monthlyEMI.toFixed(2)}</p>
                </CustomCardContent>
              </CustomCard>
              <CustomCard className="bg-gray-800 border border-gray-700">
                <CustomCardContent className="p-4 text-center">
                  <p className="text-sm text-gray-400">Total Interest</p>
                  <p className="text-xl font-bold text-green-400">₹{totalInterest.toFixed(2)}</p>
                </CustomCardContent>
              </CustomCard>
              <CustomCard className="bg-gray-800 border border-gray-700">
                <CustomCardContent className="p-4 text-center">
                  <p className="text-sm text-gray-400">Total Payment</p>
                  <p className="text-xl font-bold text-green-400">₹{totalPayment.toFixed(2)}</p>
                </CustomCardContent>
              </CustomCard>
            </div>

            {/* Prepayment Impact */}
            {prepaymentImpact && (
              <CustomCard className="bg-gray-800 border border-gray-700">
                <CustomCardHeader className="pb-2 border-b border-gray-700">
                  <CustomCardTitle className="text-white text-lg">Prepayment Impact</CustomCardTitle>
                </CustomCardHeader>
                <CustomCardContent className="pt-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-400">Months Saved</p>
                      <p className="text-xl font-bold text-blue-400">{prepaymentImpact.monthsSaved}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Interest Saved</p>
                      <p className="text-xl font-bold text-blue-400">₹{prepaymentImpact.interestSaved}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">New Total Payment</p>
                      <p className="text-xl font-bold text-blue-400">₹{prepaymentImpact.newTotalPayment.toFixed(2)}</p>
                    </div>
                  </div>
                </CustomCardContent>
              </CustomCard>
            )}

            {/* Tabs for different views */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
              <div className="flex border-b border-gray-700">
                <button 
                  className={`flex-1 py-3 flex justify-center items-center ${activeTab === 'summary' ? 'bg-gray-700 text-green-400' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('summary')}
                >
                  <PieChartIcon size={16} className="mr-2" />
                  Summary
                </button>
                <button 
                  className={`flex-1 py-3 flex justify-center items-center ${activeTab === 'chart' ? 'bg-gray-700 text-green-400' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('chart')}
                >
                  <BarChartIcon size={16} className="mr-2" />
                  Charts
                </button>
                <button 
                  className={`flex-1 py-3 flex justify-center items-center ${activeTab === 'table' ? 'bg-gray-700 text-green-400' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('table')}
                >
                  <TableIcon size={16} className="mr-2" />
                  Table
                </button>
              </div>

              <div className="p-4">
                {/* Summary View with Pie Charts */}
                {activeTab === 'summary' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-white text-center mb-2">Loan Breakup</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={loanBreakupData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {loanBreakupData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Amount']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-white text-center mb-2">Interest Comparison</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={prepaymentComparisonData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {prepaymentComparisonData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COMPARE_COLORS[index % COMPARE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Interest']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Charts View */}
                {activeTab === 'chart' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white mb-2">Original Payment Schedule</h3>
                      <div className="bg-gray-700 p-2 rounded-lg" style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={amortizationSchedule}>
                            <XAxis dataKey="month" stroke="#ffffff" />
                            <YAxis stroke="#ffffff" />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#374151', border: 'none' }}
                              formatter={(value) => [`₹${Number(value).toFixed(2)}`, '']}
                            />
                            <Legend />
                            <Bar dataKey="principalPayment" name="Principal" fill="#4CAF50" stackId="a" />
                            <Bar dataKey="interestPayment" name="Interest" fill="#2E8B57" stackId="a" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    {prepaymentSchedule.length > 0 && (
                      <div>
                        <h3 className="text-white mb-2">Payment Schedule with Prepayment</h3>
                        <div className="bg-gray-700 p-2 rounded-lg" style={{ height: '250px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={prepaymentSchedule}>
                              <XAxis dataKey="month" stroke="#ffffff" />
                              <YAxis stroke="#ffffff" />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#374151', border: 'none' }}
                                formatter={(value) => [`₹${Number(value).toFixed(2)}`, '']}
                              />
                              <Legend />
                              <Bar dataKey="principalPayment" name="Principal" fill="#4CAF50" stackId="a" />
                              <Bar dataKey="interestPayment" name="Interest" fill="#2E8B57" stackId="a" />
                              <Bar dataKey="prepayment" name="Prepayment" fill="#36A2EB" stackId="b" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Table View */}
                {activeTab === 'table' && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Month</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">EMI</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Principal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {(prepaymentSchedule.length > 0 ? prepaymentSchedule : amortizationSchedule)
                          .slice(0, Math.min(12, (prepaymentSchedule.length > 0 ? prepaymentSchedule : amortizationSchedule).length))
                          .map((row) => (
                          <tr key={row.month} className={row.prepayment ? "bg-blue-900 bg-opacity-30" : ""}>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-300">{row.month}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-300">₹{row.emi.toFixed(2)}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-300">₹{row.principalPayment.toFixed(2)}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-300">₹{row.interestPayment.toFixed(2)}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-300">₹{row.remainingPrincipal.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {(prepaymentSchedule.length > 0 ? prepaymentSchedule : amortizationSchedule).length > 12 && (
                      <div className="text-center text-gray-400 mt-2 text-sm">
                        Showing first 12 months of {(prepaymentSchedule.length > 0 ? prepaymentSchedule : amortizationSchedule).length} total months
                      </div>
                    )}
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

export default EnhancedEMICalculator;