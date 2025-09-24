import React, { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { ChatBubble } from '../components/chat/ChatBubble';
import { QuickReplies } from '../components/chat/QuickReplies';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { MessageInput } from '../components/chat/MessageInput';
import { Message } from '../types';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your StudySphere assistant. I\'m here to help you with your studies. What would you like to learn about today?',
      sender: 'bot',
      timestamp: new Date(),
      resources: []
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    'Help with math problems',
    'Study tips',
    'Research resources',
    'Writing assistance'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
        resources: text.toLowerCase().includes('math') ? [
          {
            id: '1',
            title: 'Khan Academy - Algebra Basics',
            description: 'Complete guide to algebraic concepts and problem-solving techniques.',
            url: '#',
            subject: 'Mathematics',
            type: 'video'
          },
          {
            id: '2',
            title: 'Math Problem Solver',
            description: 'Step-by-step solutions for various math problems.',
            url: '#',
            subject: 'Mathematics',
            type: 'article'
          }
        ] : undefined
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('math') || message.includes('equation') || message.includes('algebra')) {
      return 'I\'d be happy to help you with math! I can assist with algebra, geometry, calculus, and more. What specific math topic or problem are you working on? I\'ve also included some helpful resources below.';
    } else if (message.includes('study') || message.includes('tips')) {
      return 'Great question! Here are some effective study techniques: 1) Use active recall instead of just re-reading, 2) Practice spaced repetition, 3) Break study sessions into focused chunks, and 4) Test yourself regularly. What subject are you studying?';
    } else if (message.includes('research') || message.includes('paper') || message.includes('writing')) {
      return 'I can help you with research and writing! Whether you need help finding credible sources, structuring your paper, or improving your writing style, I\'m here to assist. What type of assignment are you working on?';
    } else if (message.includes('hello') || message.includes('hi')) {
      return 'Hello! I\'m excited to help you with your studies today. What subject or topic would you like to explore?';
    } else {
      return 'That\'s an interesting question! I\'m here to help you learn and understand various topics. Could you provide a bit more context about what you\'re studying or what specific help you need?';
    }
  };

  const handleQuickReply = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-16 z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">StudySphere Assistant</h1>
          <p className="text-sm text-gray-600">Where questions find answers.</p>
        </div>
        <div className="absolute right-4 top-4">
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <User className="w-5 h-5 text-gray-600" />
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
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <MessageInput 
            onSendMessage={handleSendMessage}
            disabled={isTyping}
          />
        </div>
      </div>
    </div>
  );
};