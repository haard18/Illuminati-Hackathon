import React from "react";
import { FaArrowLeft, FaClock, FaHeart } from "react-icons/fa";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";

interface HeaderProps {
  imageUrl: string;
  title: string;
  date: string;
  time: string;
  location: string;
  onBack?: () => void; // Optional back button handler
}

const Header: React.FC<HeaderProps> = ({
  imageUrl,
  title,
  date,
  time,
  location,
  onBack,
}) => {
  return (
    <div
      className="relative h-[400px] w-full overflow-hidden bg-black flex flex-col  justify-end p-6 text-white font-[Karantina-light] tracking-wider"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        onClick={onBack}
        className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
      >
        <FaHeart size={20} />
      </button>

      {/* Bottom Left Content */}
      <div className="pb-4 px-4">
        {/* Title */}
        <h1 className="text-7xl text-white font-bold">{title}</h1>

        {/* Event Details */}
        <div className="mt-2 text-3xl flex flex-wrap gap-x-6 opacity-80 font-['Kanit-Regular']">
          <div className="flex flex-row items-center gap-x-2">
            <FaCalendarDays size={20} />
            <p>{date}</p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <FaClock size={20} />
            <p>{time}</p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <FaLocationDot size={20} />
            <p>{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
