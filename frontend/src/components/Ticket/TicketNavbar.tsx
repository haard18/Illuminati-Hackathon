import React from 'react';

const TicketNavbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center">
      {/* Left Arrow Icon Button */}
      <button className="p-2 hover:bg-white/10 rounded-full transition flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50.625 13.5L57.375 20.25L37.125 40.5L57.375 60.75L50.625 67.5L23.625 40.5L50.625 13.5Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Custom Menu Icon Button */}
      <button className="p-2 hover:bg-white/10 rounded-full transition flex items-center justify-center">
        <svg
          width="50"
          height="50"
          viewBox="0 0 92 92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 69V61.3333H80.5V69H11.5ZM11.5 49.8333V42.1667H80.5V49.8333H11.5ZM11.5 30.6667V23H80.5V30.6667H11.5Z"
            fill="white"
          />
        </svg>
      </button>
    </nav>
  );
};

export default TicketNavbar;
