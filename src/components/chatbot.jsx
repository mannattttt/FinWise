import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = { 
      text: inputMessage, 
      sender: 'user' 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await axios.post('http://localhost:5000/chat', {
        message: inputMessage
      });

      // Add AI response to chat
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
    <div className="fixed inset-0 flex flex-col bg-gray-100 overflow-hidden">
      {/* Main Chat Container */}
      <div className="flex-grow flex flex-col justify-center items-center p-4 overflow-hidden">
        {messages.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">What can I help with?</h1>
            <p className="text-gray-500">Ask anything</p>
          </div>
        ) : (
          <div className="w-full max-w-3xl h-full flex flex-col overflow-hidden">
            <div className="flex-grow overflow-hidden">
              <div className="space-y-4 h-full overflow-y-auto scrollbar-hide">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] px-4 py-3 rounded-2xl 
                        ${msg.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-800 border'}
                      `}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl border">
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
      <div className="flex justify-center p-4 bg-white border-t">
        <div className="w-full max-w-3xl flex items-center">
          <div className="flex-grow relative">
            <textarea 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything"
              className="w-full px-4 py-3 pr-12 border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
            />
            {inputMessage && (
              <button 
                onClick={sendMessage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
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