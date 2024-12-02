import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import { openAIService } from '../../services/ai/openAIService';
import { formatAIResponse } from '../../utils/aiResponseFormatter';
import DOMPurify from 'dompurify';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
  }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await openAIService.getAssistantResponse(threadId, userMessage);
      setThreadId(response.threadId);
      const formattedMessage = formatAIResponse(response.message);
      setMessages(prev => [...prev, { role: 'assistant', content: formattedMessage }]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2 p-4 border-b">
        <Bot className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-semibold">Tax Planning Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.role === 'user' ? 'justify-end' : ''
            }`}
          >
            {message.role === 'assistant' && (
              <Bot className="w-6 h-6 text-blue-600 mt-1" />
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.role === 'assistant' ? (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(message.content)
                  }} 
                />
              ) : (
                message.content
              )}
            </div>
            {message.role === 'user' && (
              <User className="w-6 h-6 text-blue-600 mt-1" />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <div className="bg-gray-100 p-3 rounded-lg">
              <Loader className="w-5 h-5 animate-spin text-blue-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about tax planning..."
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};