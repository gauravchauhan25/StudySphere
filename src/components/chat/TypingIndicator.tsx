import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex max-w-xs lg:max-w-md">
        <div className="flex-shrink-0 mr-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-3 shadow-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};