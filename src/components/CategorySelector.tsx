
import React from 'react';

const categories = [
  { id: 'food', name: 'Food', emoji: '🍕', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'games', name: 'Games', emoji: '🎮', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'books', name: 'Books', emoji: '📚', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'toys', name: 'Toys', emoji: '🧸', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'clothes', name: 'Clothes', emoji: '👕', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'other', name: 'Other', emoji: '💝', color: 'bg-gray-100 text-gray-700 border-gray-200' }
];

interface CategorySelectorProps {
  value: string;
  onChange: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        What did you spend on? 🤔
      </label>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
              value === category.id
                ? category.color + ' border-current shadow-lg'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl mb-1">{category.emoji}</div>
            <div className="text-sm font-semibold">{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
