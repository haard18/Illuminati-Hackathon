import React from 'react';
import { Menu } from 'lucide-react';

const SearchIcon = () => (
  <svg viewBox="0 0 40 40" className="w-6 h-6">
    <circle
      cx="18"
      cy="18"
      r="10"
      fill="#000000"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="25"
      y1="25"
      x2="33"
      y2="33"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const Navbar = () => {
  return (
    <div className="w-full bg-black">
      {/* Top Navigation Bar */}
      <nav className="w-full px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-[35px] h-[35px] bg-[#FF895E] rounded-full border-2 border-white" />
          <span className="text-white font-['League Spartan'] text-lg">Logo Here</span>
        </div>
        <button className="text-white p-1">
          <Menu size={40} />
        </button>
      </nav>

      {/* Search Bar Section */}
      <div className="px-8 pb-4">
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center text-gray-500">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full py-3 pl-14 pr-4 bg-gray-200 rounded-2xl
                       focus:outline-none focus:ring-2 focus:ring-gray-300
                       font-['Kanit'] text-lg placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
