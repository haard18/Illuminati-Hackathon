import React, { useState } from 'react';

const categories = [
  { name: 'Musical Events', bgColor: 'bg-[#A14BFD]', borderColor: 'border-[#438EFF]'},
  { name: 'Stand Up Events', bgColor: 'bg-[#FFDE5A]', borderColor: 'border-[#FFDE5A]'},
  { name: 'Live Concerts', bgColor: 'bg-[#FFDE5A]', borderColor: 'border-[#FFDE5A]' },
  { name: 'Dance Events', bgColor: 'bg-[#FFDE5A]', borderColor: 'border-[#FFDE5A]' },
];

const EventCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Musical Events');

  return (
    <div className="w-full bg-black py-4">
      <div className="flex justify-center gap-4 px-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`
              ${category.bgColor}
              ${selectedCategory === category.name ? 'ring-2 ring-white' : ''}
              py-2 px-4 rounded-lg text-black font-medium
              transition-all duration-200 ease-in-out
              flex-1 text-center whitespace-nowrap
              hover:opacity-90 active:scale-95
              text-sm md:text-base
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventCategories;
