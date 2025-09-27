import React from 'react';

export const QuickReplies = ({ suggestions, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="px-3 py-1.5 
                     bg-teal-50 dark:bg-teal-900 
                     border border-teal-200 dark:border-teal-700 
                     text-teal-700 dark:text-teal-300 
                     rounded-full text-sm 
                     hover:bg-teal-100 dark:hover:bg-teal-800 
                     transition-colors duration-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};
