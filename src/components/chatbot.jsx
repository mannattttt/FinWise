import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify'; // You may need to install this package

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('cyberpunk'); // cyberpunk, minimal, dark
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Theme configurations
  const themes = {
    cyberpunk: {
      bg: 'bg-black',
      textPrimary: 'text-green-500',
      textSecondary: 'text-green-300',
      userBubble: 'bg-green-600 text-white',
      aiBubble: 'bg-gray-800 text-green-300 border border-green-700',
      inputBg: 'bg-gray-800',
      inputBorder: 'border-green-700',
      inputText: 'text-green-300',
      buttonHover: 'hover:text-green-400',
      headerBg: 'bg-gray-900 border-b border-green-700',
      footerBg: 'bg-gray-900 border-t border-green-700',
    },
    minimal: {
      bg: 'bg-white',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-600',
      userBubble: 'bg-blue-500 text-white',
      aiBubble: 'bg-gray-100 text-gray-800',
      inputBg: 'bg-white',
      inputBorder: 'border-gray-300',
      inputText: 'text-gray-700',
      buttonHover: 'hover:text-blue-600',
      headerBg: 'bg-white border-b border-gray-200',
      footerBg: 'bg-white border-t border-gray-200',
    },
    dark: {
      bg: 'bg-gray-900',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      userBubble: 'bg-purple-600 text-white',
      aiBubble: 'bg-gray-800 text-gray-200',
      inputBg: 'bg-gray-800',
      inputBorder: 'border-gray-700',
      inputText: 'text-gray-200',
      buttonHover: 'hover:text-purple-400',
      headerBg: 'bg-gray-800 border-b border-gray-700',
      footerBg: 'bg-gray-800 border-t border-gray-700',
    }
  };

  const currentTheme = themes[theme];

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to format asterisks to proper bullet points
  const formatMessageWithBulletPoints = (text) => {
    // Replace *** with bullet points
    let formattedText = text.replace(/\*\*\*(.*?)(\*\*\*|$)/g, '• $1');
    
    // Replace ** with bullet points (in case there are double asterisks)
    formattedText = formattedText.replace(/\*\*(.*?)(\*\*|$)/g, '• $1');
    
    // Replace * with bullet points if they are at the beginning of a line
    formattedText = formattedText.replace(/^\s*\*(.*?)$/gm, '• $1');
    formattedText = formattedText.replace(/\n\s*\*(.*?)$/gm, '\n• $1');
    
    // Convert any markdown-style lists to bullet points
    formattedText = formattedText.replace(/^\s*-\s+(.*?)$/gm, '• $1');
    formattedText = formattedText.replace(/\n\s*-\s+(.*?)$/gm, '\n• $1');
    
    // Convert any numbered lists to bullet points
    formattedText = formattedText.replace(/^\s*\d+\.\s+(.*?)$/gm, '• $1');
    formattedText = formattedText.replace(/\n\s*\d+\.\s+(.*?)$/gm, '\n• $1');
    
    return formattedText;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { 
      text: inputMessage, 
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Updated to use the new Render API endpoint
      const response = await axios.post('https://flask-server-u8z6.onrender.com/chat', {
        message: inputMessage,
        formatStyle: 'bulletPoints' // Tell the backend to format responses with bullet points
      });

      // Format the response with bullet points
      const formattedMessage = formatMessageWithBulletPoints(response.data.message);

      const aiMessage = { 
        text: formattedMessage, 
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFormatted: true
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        text: 'Sorry, something went wrong. Please try again.', 
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const toggleTheme = () => {
    const themes = ['cyberpunk', 'minimal', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };
  
  const goToHomePage = () => {
    navigate('/');
  };

  // Custom scrollbar style for the chat container
  const scrollbarStyle = {
    // Hide scrollbar completely while maintaining scroll functionality
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE/Edge
  };

  // Additional style to hide webkit scrollbar
  const webkitScrollbarStyle = `
    ::-webkit-scrollbar {
      display: none;
    }
  `;

  // Style for bullet points display
  const bulletPointStyle = `
    .bullet-point-list ul {
      list-style-type: none;
      padding-left: 1rem;
    }
    .bullet-point-list li {
      position: relative;
      padding-left: 1rem;
      margin-bottom: 0.5rem;
    }
    .bullet-point-list li:before {
      content: "•";
      position: absolute;
      left: 0;
    }
  `;

  return (
    <div className={`fixed inset-0 flex flex-col ${currentTheme.bg} overflow-hidden`}>
      {/* Add webkit scrollbar style */}
      <style>{`${webkitScrollbarStyle} ${bulletPointStyle}`}</style>
      
      {/* Header */}
      <div className={`p-4 ${currentTheme.headerBg} flex justify-between items-center`}>
        <div className="flex items-center">
          <button 
            onClick={goToHomePage}
            className={`${currentTheme.textPrimary} hover:opacity-80 transition-opacity mr-4 flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <h1 className={`font-bold ${currentTheme.textPrimary}`}>FinBot</h1>
        </div>
        <div className="flex">
          <button 
            onClick={clearChat}
            className={`mr-4 ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} text-sm flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </button>
          <button 
            onClick={toggleTheme}
            className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} text-sm flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Theme
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-grow flex flex-col justify-center items-center p-4 overflow-hidden">
        {messages.length === 0 ? (
          <div className="text-center">
            <div className={`mb-6 ${currentTheme.textPrimary}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h1 className={`text-4xl font-bold text-white mb-4`}>How can I assist you today?</h1>
            <p className={`${currentTheme.textSecondary} mb-6`}>Ask me anything or try one of the suggestions below</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
              {["tell me about investment strategies", "explain banking services", "what are the benefits of compounding interest"].map((suggestion, index) => (
                <button 
                  key={index}
                  onClick={() => setInputMessage(suggestion)}
                  className={`px-4 py-2 rounded-full ${currentTheme.aiBubble} hover:opacity-80 transition-opacity text-sm`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl h-full flex flex-col overflow-hidden">
            <div 
              className="flex-grow overflow-y-auto px-2" 
              style={scrollbarStyle}
            >
              <div className="space-y-4 py-4">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div 
                      className={`
                        max-w-[80%] px-4 py-3 rounded-2xl relative group
                        ${msg.sender === 'user' 
                          ? currentTheme.userBubble
                          : currentTheme.aiBubble}
                      `}
                    >
                      <div className={`mb-1 ${msg.isFormatted ? 'whitespace-pre-line' : ''}`}>
                        {msg.text.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < msg.text.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className={`text-xs opacity-50 text-right mt-1`}>
                        {msg.timestamp}
                      </div>
                      <div className="absolute -bottom-4 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} text-xs mr-3`}
                          onClick={() => navigator.clipboard.writeText(msg.text)}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    {msg.sender === 'user' && (
                      <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center ml-2 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${currentTheme.aiBubble}`}>
                      <div className="flex space-x-1">
                        <div className={`h-2 w-2 rounded-full ${currentTheme.textPrimary} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                        <div className={`h-2 w-2 rounded-full ${currentTheme.textPrimary} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                        <div className={`h-2 w-2 rounded-full ${currentTheme.textPrimary} animate-bounce`} style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`flex justify-center p-4 ${currentTheme.footerBg}`}>
        <div className="w-full max-w-3xl flex items-center">
          <div className="flex-grow relative">
            <textarea 
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={`w-full px-4 py-3 pr-12 ${currentTheme.inputBg} ${currentTheme.inputText} border ${currentTheme.inputBorder} rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-${theme === 'cyberpunk' ? 'green' : theme === 'minimal' ? 'blue' : 'purple'}-500`}
              rows={1}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex">
              {inputMessage && (
                <button 
                  onClick={sendMessage}
                  className={`${currentTheme.textPrimary} ${currentTheme.buttonHover}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className={`px-4 py-2 text-xs ${currentTheme.textSecondary} ${currentTheme.headerBg} flex justify-between`}>
        <span>Powered by FINWISE</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Chatbot;
