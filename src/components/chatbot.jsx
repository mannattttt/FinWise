import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { 
      text: inputMessage, 
      sender: 'user' 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: inputMessage
      });

      const aiMessage = { 
        text: response.data.message, 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        text: 'Sorry, something went wrong. Please try again.', 
        sender: 'ai' 
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

  return (
    <div className="fixed inset-0 flex flex-col bg-black overflow-hidden">
      {/* Main Chat Container */}
      <div className="flex-grow flex flex-col justify-center items-center p-4 overflow-hidden">
        {messages.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-500 mb-4">What can I help with?</h1>
            <p className="text-green-300">Ask anything</p>
          </div>
        ) : (
          <div className="w-full max-w-3xl h-full flex flex-col overflow-hidden">
            <div className="flex-grow overflow-y-auto" style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}>
              <div className="space-y-4 pr-2">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] px-4 py-3 rounded-2xl 
                        ${msg.sender === 'user' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-800 text-green-300 border border-green-700'}
                      `}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-green-300 px-4 py-3 rounded-2xl border border-green-700">
                      Typing...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex justify-center p-4 bg-gray-900 border-t border-green-700">
        <div className="w-full max-w-3xl flex items-center">
          <div className="flex-grow relative">
            <textarea 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything"
              className="w-full px-4 py-3 pr-12 bg-gray-800 text-green-300 border border-green-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={1}
            />
            {inputMessage && (
              <button 
                onClick={sendMessage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;