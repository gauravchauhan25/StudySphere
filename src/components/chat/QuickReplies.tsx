import React from 'react';

interface QuickRepliesProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-700 rounded-full text-sm hover:bg-teal-100 transition-colors duration-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};