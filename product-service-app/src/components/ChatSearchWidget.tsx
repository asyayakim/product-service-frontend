// src/components/ChatSearchWidget.tsx
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { EMBEDDING_API_URL } from '../apiConfig';

interface SearchResult {
  text: string;
  metadata: string;
  similarity: number;
}

export default function ChatSearchWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    // Add user message
    const userMessage = { text: query, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    setLoading(true);
    setQuery('');
    
    try {
     const response = await axios.post<SearchResult[]>(`${EMBEDDING_API_URL}/search`, {
       query
   });

      
      const resultMessage = { 
        text: `Here are the top ${response.data.length} results:`, 
        isUser: false 
      };
      setMessages(prev => [...prev, resultMessage]);
      
      setResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      const errorMessage = { 
        text: "Sorry, I couldn't find any results. Please try again.", 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-widget-container">
      {isOpen ? (
        <div className="chat-widget">
          <div className="chat-header">
            <h3>Product Assistant</h3>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>
          
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>Hi! I'm your product assistant. Ask me about products like:</p>
                <ul>
                  <li>"Healthy snacks"</li>
                  <li>"Organic groceries"</li>
                </ul>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
            
            {results.length > 0 && !loading && (
              <div className="results">
                {results.map((result, index) => (
                  <div key={index} className="result-item">
                    <p><strong>Product:</strong> {result.text}</p>
                    <p><strong>Category:</strong> {result.metadata.split(':')[1]?.trim() || result.metadata}</p>
                    <p><strong>Match:</strong> {(result.similarity * 100).toFixed(1)}%</p>
                  </div>
                ))}
              </div>
            )}
            
            {loading && (
              <div className="bot-message loading">
                <span>Searching...</span>
                <div className="loading-dots">
                  <div></div><div></div><div></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about products..."
              disabled={loading}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} disabled={loading || !query.trim()}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <button className="chat-toggle-btn" onClick={toggleChat}>
          <span>Product Assistant</span>
        </button>
      )}
    </div>
  );
}