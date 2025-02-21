import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';

const TicketNavbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center">
      <button className="p-2 hover:bg-white/10 rounded-full transition">
        <ArrowLeft size={24} className="text-white" />
      </button>
      <button className="p-2 hover:bg-white/10 rounded-full transition">
        <Menu size={24} className="text-white" />
      </button>
    </nav>
  );
};

export default TicketNavbar;