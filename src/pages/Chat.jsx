import React, { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { ChatBubble } from '../components/chat/ChatBubble';
import { QuickReplies } from '../components/chat/QuickReplies';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { MessageInput } from '../components/chat/MessageInput';

export const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm your StudySphere assistant. I'm here to help you with your studies. What would you like to learn about today?",
      sender: 'bot',
      timestamp: new Date(),
      resources: [],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickSuggestions = [
    'Help with math problems',
    'Study tips',
    'Research resources',
    'Writing assistance',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  async function getChatbotResponse(messages) {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reply;
  }

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const replyText = await getChatbotResponse(apiMessages);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: 'bot',
        timestamp: new Date(),
        resources: replyText.toLowerCase().includes('math')
          ? [
              {
                id: '1',
                title: 'Khan Academy - Algebra Basics',
                description:
                  'Complete guide to algebraic concepts and problem-solving techniques.',
                url: '#',
                subject: 'Mathematics',
                type: 'video',
              },
              {
                id: '2',
                title: 'Math Problem Solver',
                description:
                  'Step-by-step solutions for various math problems.',
                url: '#',
                subject: 'Mathematics',
                type: 'article',
              },
            ]
          : undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching bot reply:', error);
      const errorMessage = {
        id: (Date.now() + 2).toString(),
        text: 'Sorry, something went wrong. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-16 z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            StudySphere Assistant
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Where questions find answers.
          </p>
        </div>
        <div className="absolute right-4 top-4">
          <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {isTyping && <TypingIndicator />}

          {messages.length === 1 && (
            <QuickReplies
              suggestions={quickSuggestions}
              onSelect={handleQuickReply}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};
