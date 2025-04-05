import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  useEffect(() => {
    // Animation for elements to fade in when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });

    // Select all elements with the animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    // Removed pt-16 (padding-top) that was creating space for navbar
    <div className="bg-black text-gray-200">
      {/* Hero Section with pure black/green gradient */}
      <section className="py-24 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #000000 0%, #0f3a1c 50%, #184d25 75%, #00ff00 100%)'
      }}>
        <div className="absolute inset-0 z-0">
          {/* Animated green particles */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500 rounded-full filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-green-400 rounded-full filter blur-3xl opacity-10 animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-green-300 rounded-full filter blur-3xl opacity-15 animate-pulse"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-8 text-white animate-fadeIn">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">FinWise</span>
            </h1>
            <p className="text-2xl text-green-300 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              Simplifying financial decisions with personalized, AI-powered guidance
            </p>
          </div>
        </div>
        {/* Animated line at bottom of hero */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-black animate-pulse"></div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-on-scroll opacity-0">
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Our Mission</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              At FinWise, we understand that managing personal finances can be overwhelming. Complex banking terms, 
              numerous government schemes, and intricate loan options often leave individuals missing out on beneficial 
              opportunities simply due to a lack of accessible information.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our mission is to democratize financial knowledge and empower every individual to make informed financial 
              decisions through our AI-powered financial assistant designed to simplify and personalize financial management.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section with pure black background */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(circle at 50% 50%, #0a2714 0%, #000000 70%)'
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">What FinWise Offers</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-black to-green-900 p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 animate-on-scroll opacity-0" style={{ 
              animationDelay: '0.1s', 
              boxShadow: '0 4px 20px rgba(0, 255, 0, 0.2)',
              border: '1px solid rgba(0, 255, 0, 0.1)'
            }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-6 transform transition duration-500 group-hover:scale-110">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-green-400">Smart Eligibility Checker</h3>
              <p className="text-gray-300">
                Matches users with suitable government subsidies, loan programs, and banking offers based on their unique profiles.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-black to-green-900 p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 animate-on-scroll opacity-0" style={{ 
              animationDelay: '0.2s', 
              boxShadow: '0 4px 20px rgba(0, 255, 0, 0.2)',
              border: '1px solid rgba(0, 255, 0, 0.1)'
            }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-green-400">Bank & Government Scheme Explorer</h3>
              <p className="text-gray-300">
                Provides detailed insights into banking policies and government schemes, allowing users to filter and understand options relevant to them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-black to-green-900 p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 animate-on-scroll opacity-0" style={{ 
              animationDelay: '0.3s', 
              boxShadow: '0 4px 20px rgba(0, 255, 0, 0.2)',
              border: '1px solid rgba(0, 255, 0, 0.1)'
            }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-green-400">AI Chatbot</h3>
              <p className="text-gray-300">
                Delivers instant, personalized financial assistance, answering queries like 'Which bank has the lowest home loan rate?' or 'Am I eligible for PMAY?'
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-black to-green-900 p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 animate-on-scroll opacity-0" style={{ 
              animationDelay: '0.4s', 
              boxShadow: '0 4px 20px rgba(0, 255, 0, 0.2)',
              border: '1px solid rgba(0, 255, 0, 0.1)'
            }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-green-400">Financial Terminology Guide</h3>
              <p className="text-gray-300">
                Educates users on banking terms and concepts, enhancing their financial literacy and confidence in decision-making.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-black to-green-900 p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 animate-on-scroll opacity-0" style={{ 
              animationDelay: '0.5s', 
              boxShadow: '0 4px 20px rgba(0, 255, 0, 0.2)',
              border: '1px solid rgba(0, 255, 0, 0.1)'
            }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-green-400">Loan & EMI Calculators</h3>
              <p className="text-gray-300">
                Helps users compare loan options and plan repayments effectively, providing clarity on financial commitments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #000000 0%, #052e13 100%)'
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Bridging the Gap</span>
            </h2>
            <p className="text-xl text-gray-200 mb-12 leading-relaxed">
              By integrating these features, FinWise empowers individuals to make informed financial decisions, 
              bridging the gap between complex financial information and everyday users.
            </p>
            <div className="mt-8">
              <Link to="/" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-4 px-10 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg inline-block">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, #041a0b 0%, #000000 70%)'
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Meet Our Team</span>
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            {/* Team Member 1 */}
            <div className="text-center animate-on-scroll opacity-0" style={{ animationDelay: '0.1s' }}>
              <div className="w-40 h-40 mx-auto mb-6 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
                <div className="relative bg-black rounded-full p-1 h-full w-full">
                  <img src="src/assets/placeholder/placeholder.png" alt="Mannat" className="w-full h-full rounded-full object-cover transform transition duration-700 hover:scale-110" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-green-400">Mannat</h3>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="w-40 h-40 mx-auto mb-6 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
                <div className="relative bg-black rounded-full p-1 h-full w-full">
                  <img src="src/assets/placeholder/placeholder.png" alt="Unnati" className="w-full h-full rounded-full object-cover transform transition duration-700 hover:scale-110" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-green-400">Unnati</h3>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
              <div className="w-40 h-40 mx-auto mb-6 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
                <div className="relative bg-black rounded-full p-1 h-full w-full">
                  <img src="src/assets/placeholder/placeholder.png" alt="Saransh" className="w-full h-full rounded-full object-cover transform transition duration-700 hover:scale-110" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-green-400">Saransh</h3>
            </div>
            
            {/* Team Member 4 */}
            <div className="text-center animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="w-40 h-40 mx-auto mb-6 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
                <div className="relative bg-black rounded-full p-1 h-full w-full">
                  <img src="src/assets/placeholder/placeholder.png" alt="Shaurya" className="w-full h-full rounded-full object-cover transform transition duration-700 hover:scale-110" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-green-400">Shaurya</h3>
            </div>
            
            {/* Team Member 5 */}
            <div className="text-center animate-on-scroll opacity-0" style={{ animationDelay: '0.5s' }}>
              <div className="w-40 h-40 mx-auto mb-6 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
                <div className="relative bg-black rounded-full p-1 h-full w-full">
                  <img src="src/assets/placeholder/placeholder.png" alt="Saksham" className="w-full h-full rounded-full object-cover transform transition duration-700 hover:scale-110" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-green-400">Saksham</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;

