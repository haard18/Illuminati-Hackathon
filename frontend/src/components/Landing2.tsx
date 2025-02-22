import { useState } from "react";
import { ChevronRight } from "lucide-react";
import coldplay from "../assets/coldplay.jpeg";
import InfiniteScrollStrip from "./Landingpage/InfiniteCarousel";

const events = [
  {
    image: coldplay,
    title: "INDIA X COLDPLAY",
    description: "Explore now & get amazing deals on your bookings!",
    date: "25 January, 2025",
    venue: "D.Y. Patil Stadium",
  },
  {
    image: coldplay,
    title: "ED SHEERAN LIVE",
    description: "Book your seats for an unforgettable night!",
    date: "10 February, 2025",
    venue: "NSCI Dome, Mumbai",
  },
];

export default function Landing2() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % events.length);
  };

  return (
    <>
    <InfiniteScrollStrip/>
    <div className="relative w-full h-96">
      {/* Background Image Container */}
      <div className="overflow-hidden rounded-4xl h-full" style={{borderRadius:'0px 0px 50px 50px'}}>
        <img
          src={events[current].image}
          alt={events[current].title}
          className="w-full h-96 object-cover"
        />
        {/* Purple overlay */}
        <div className="absolute inset-0 bg-purple-600/30 " style={{borderRadius:'0px 0px 50px 50px'}} />
      </div>

      {/* Dark overlay with Content */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 px-15 flex flex-row justify-between items-center text-white rounded-4xl" style={{borderRadius:'0px 0px 50px 50px'}}>
        {/* Left Side: Title and Description */}
        <div className="flex flex-col">
          <h2 className="text-7xl font-['Karantina-regular']">
            {events[current].title.split(" ").slice(0, 2).join(" ")}
            <br />
            {events[current].title.split(" ").slice(2).join(" ")}
          </h2>
          <p className="text-4xl mt-4 font-['Karantina-light']">
            {events[current].description.split(" ").slice(0, 4).join(" ")}
            <br />
            {events[current].description.split(" ").slice(4).join(" ")}
          </p>
        </div>

        {/* Right Side: Date and Venue */}
        <div className="flex flex-col">
          {/* Date SVG */}
          <svg
            width="280"
            height="48"
            viewBox="0 0 454 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="454"
              y="78.2842"
              width="368.902"
              height="78.2271"
              rx="45"
              transform="rotate(180 454 78.2842)"
              fill="#FFE992"
            />
            <path d="M0 78L113 0V78H0Z" fill="#FFE992" />
            <text
              x="55%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="Arial"
              fontSize="32"
              fill="black"
            >
              Date: {events[current].date}
            </text>
          </svg>

          {/* Venue SVG */}
          <svg
            width="290"
            height="48"
            viewBox="0 0 478 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="388.403"
              height="78.2271"
              rx="45"
              transform="matrix(1 0 0 -1 0 78.2842)"
              fill="#EF9210"
            />
            <path d="M478 78L359.026 0V78H478Z" fill="#EF9210" />
            <text
              x="45%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="Arial"
              fontSize="32"
              fill="black"
            >
              Venue: {events[current].venue}
            </text>
          </svg>
        </div>
      </div>

      {/* Register Now Button */}
      <button className="absolute tracking-wider font-['Karantina-bold'] text-5xl left-1/2 -translate-x-1/2 -bottom-8 bg-t-green hover:bg-green-600 text-white px-10 py-4 rounded-4xl font-bold transform transition-transform hover:scale-105 z-10 outline-none focus:outline-none">
        Register Now
      </button>

      {/* Next Slide Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900/50 hover:bg-gray-900 text-white p-3 rounded-full outline-none focus:outline-none"
      >
        <ChevronRight size={32} />
      </button>
    </div>
    </>
  );
}