import React from 'react';
import { Message } from '../../types';
import { User, Bot } from 'lucide-react';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex max-w-xs lg:max-w-md ${isBot ? '' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isBot ? 'mr-3' : 'ml-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isBot 
              ? 'bg-gray-100 text-gray-600' 
              : 'bg-blue-600 text-white'
          }`}>
            {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
          </div>
        </div>
        
        {/* Message */}
        <div className={`rounded-lg px-4 py-2 shadow-sm ${
          isBot 
            ? 'bg-gray-100 text-gray-800' 
            : 'bg-blue-600 text-white'
        }`}>
          <p className="text-sm">{message.text}</p>
          {message.resources && message.resources.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.resources.map((resource) => (
                <div key={resource.id} className="bg-white/10 rounded-lg p-3 border border-white/20">
                  <h4 className="font-medium text-sm">{resource.title}</h4>
                  <p className="text-xs opacity-80 mt-1">{resource.description}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {resource.subject}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};