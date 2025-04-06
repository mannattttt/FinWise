import React, { useState } from 'react';
import BackButton from './back_button';

const HelpButton = () => {
  const [expandedSection, setExpandedSection] = useState('account');

  // Updated theme colors and gradients with more green and black focus
  const colors = {
    primaryGreen: '#00ff72', // Brighter green
    primaryDark: '#000000', // Pure black
    lightGreen: '#00e676', // Another bright green shade
    darkGreen: '#003300', // Very dark green
    white: '#ffffff',
    lightGray: '#e9ecef',
    accentGreen: '#4dff88' // Lighter accent green
  };

  const gradients = {
    mainBackground: `linear-gradient(to bottom, ${colors.primaryDark} 0%, ${colors.darkGreen} 100%)`, // Black to dark green
    primaryButton: `linear-gradient(135deg, ${colors.primaryGreen} 0%, ${colors.lightGreen} 70%, ${colors.primaryGreen} 100%)`, // Shades of green
    cardGradient: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,51,0,0.8) 100%)` // Black to dark green
  };

  // FAQ sections remain the same
  const faqSections = {
    account: {
      title: 'Account Management',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button in the top right corner and follow the instructions to create your FinWise account.'
        },
        {
          question: 'Is my financial information secure?',
          answer: 'Yes. FinWise uses bank-level encryption to protect your data. We never share your information with third parties without your consent.'
        },
        {
          question: 'Can I use FinWise on mobile devices?',
          answer: 'Yes, FinWise is fully responsive and works on smartphones and tablets.'
        }
      ]
    },
    using: {
      title: 'Using FinWise',
      questions: [
        {
          question: 'How accurate are the eligibility checks?',
          answer: 'Our algorithms provide high-accuracy matches based on the information you provide and current scheme criteria. However, final eligibility is determined by the respective banks or government bodies.'
        },
        {
          question: 'How often is information updated?',
          answer: 'Banking offers and government schemes are updated weekly. Interest rates are refreshed daily.'
        },
        {
          question: 'Can I download reports from FinWise?',
          answer: 'Yes, you can download PDF reports of your eligibility checks, loan calculations, and saved schemes.'
        }
      ]
    },
    technical: {
      title: 'Technical Support',
      questions: [
        {
          question: 'The website isn\'t loading properly. What should I do?',
          answer: 'Try clearing your browser cache or switching to a different browser. If issues persist, contact our support team.'
        },
        {
          question: 'How do I report incorrect information?',
          answer: 'Use the "Report an Issue" button available on each page to notify our team about any discrepancies.'
        }
      ]
    }
  };

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      background: gradients.mainBackground,
      color: colors.white,
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      overflowY: 'auto',
      zIndex: 9999
    }}>
      <BackButton/>
      <div style={{
        padding: '2rem',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            background: `-webkit-linear-gradient(${colors.white}, ${colors.primaryGreen})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Help & Support
          </h1>
          <p style={{ color: colors.lightGray, maxWidth: '700px', margin: '0 auto' }}>
            Welcome to FinWise, your AI-powered financial assistant. This help center will guide you through our platform and answer common questions.
          </p>
        </header>

        {/* Main content */}
        <div style={{ 
          maxWidth: '800px', 
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          flex: '1 0 auto'
        }}>
          {/* FAQ Sections */}
          {Object.keys(faqSections).map((sectionKey) => (
            <div key={sectionKey} style={{ 
              background: gradients.cardGradient,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
              border: `1px solid ${colors.darkGreen}`
            }}>
              <button 
                onClick={() => setExpandedSection(expandedSection === sectionKey ? null : sectionKey)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1.25rem',
                  background: 'transparent',
                  border: 'none',
                  color: colors.white,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {faqSections[sectionKey].title}
                <span>{expandedSection === sectionKey ? '−' : '+'}</span>
              </button>
              
              {expandedSection === sectionKey && (
                <div style={{ padding: '0 1.25rem 1.25rem' }}>
                  {faqSections[sectionKey].questions.map((item, index) => (
                    <div key={index} style={{ marginBottom: index < faqSections[sectionKey].questions.length - 1 ? '1.25rem' : '0' }}>
                      <h4 style={{ color: colors.primaryGreen, marginBottom: '0.5rem' }}>{item.question}</h4>
                      <p style={{ color: colors.lightGray, margin: '0' }}>{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Contact Support */}
          <div style={{ 
            background: gradients.cardGradient,
            borderRadius: '12px',
            padding: '1.5rem',
            marginTop: '1rem',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            border: `1px solid ${colors.darkGreen}`
          }}>
            <h3 style={{ color: colors.primaryGreen, marginTop: 0 }}>Contact Support</h3>
            <p style={{ color: colors.lightGray }}>
              Still need help? Our support team is available to assist you:
            </p>
            <ul style={{ 
              color: colors.lightGray,
              paddingLeft: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <li>Email: support@finwise.com</li>
              <li>Chat: Click the chat icon in the bottom right corner</li>
              <li>Phone: 1-800-FIN-WISE (Available Mon-Fri, 9 AM - 6 PM)</li>
            </ul>
            
            <button style={{
              background: gradients.primaryButton,
              color: colors.primaryDark,
              fontWeight: 'bold',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}>
              Submit a Support Request
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ 
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: `1px solid ${colors.primaryGreen}`,
          color: colors.lightGray
        }}>
          <p>FinWise - Empowering Your Financial Decisions</p>
        </footer>
      </div>
    </div>
  );
};

export default HelpButton;