import React from "react";
import t1 from "../assets/ticket1.jpeg";
import t2 from "../assets/ticket2.jpeg";
import t3 from "../assets/ticket3.jpeg";
import t4 from "../assets/ticket4.jpeg";
import { ChevronRight, ArrowUpRight } from "lucide-react";

const events = [
  { image: t1, title: "INDIA X COLDPLAY" },
  { image: t2, title: "DILUMINATI TOUR" },
  { image: t3, title: "ONE DIRECTION" },
  { image: t4, title: "ARIJIT SINGH" },
];

const EventCarousel: React.FC = () => {
  return (
    <div className="bg-black p-6 flex flex-col items-center mt-16">
      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-60 gap-y-14">
        {events.map((event, index) => (
          <div
            key={index}
            className="relative flex items-center bg-[#FFE992] p-4 rounded-4xl shadow-lg w-[380px] h-[120px]"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-48 h-26 rounded-3xl object-cover"
            />
            <div className="ml-3 flex-1">
              <h3 className="text-4xl font-['Karantina-bold'] text-black leading-tight">
                {event.title.split(" ").slice(0, 2).join(" ")} <br />
                {event.title.split(" ").slice(2).join(" ")}
              </h3>
            </div>

            {/* GET TICKETS Button */}
            <button className="absolute -top-8 -right-6">
            <svg
                width="170"
                height="54"
                viewBox="0 0 222 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M199.358 0.907739L29.8352 15.2108L0.931927 18.1696L19.8661 40.2071L8.03231 48.3933L30.1756 53.5372L23.2879 70.8074L40.031 77.4848L33.1433 94.755L221.259 76.805L206.255 70.8213L213.143 53.5511L199.662 48.1744L208.996 24.7687L192.471 18.1779L199.358 0.907739Z"
                  fill="#FF7A27"
                />
                <text
                  x="50%"
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="white"
                  fontSize="44"
                  fontWeight="bold"
                  fontFamily="Karantina-bold"
                >
                  GET TICKETS
                </text>
              </svg>
            </button>

            {/* New Button: 50% Inside and 50% Outside */}
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-[#FF895E] hover:bg-gray-900 hover:text-white text-black p-2 rounded-full outline-none focus:outline-none"
            >
              <ChevronRight size={26} />
            </button>
          </div>
        ))}
      </div>

      {/* View All Events Button */}
      <div className="w-full flex justify-start mt-10 pl-52"> {/* Adjusted alignment and padding */}
        <button className="flex items-center text-white text-xl font-bold px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300">
          {/* Calendar Icon with Star */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M52.5 11.25C52.5 10.2554 52.1049 9.30161 51.4016 8.59835C50.6984 7.89509 49.7446 7.5 48.75 7.5H41.25V3.75H37.5V7.5H22.5V3.75H18.75V7.5H11.25C10.2554 7.5 9.30161 7.89509 8.59835 8.59835C7.89509 9.30161 7.5 10.2554 7.5 11.25V48.75C7.5 49.7446 7.89509 50.6984 8.59835 51.4016C9.30161 52.1049 10.2554 52.5 11.25 52.5H18.75V48.75H11.25V11.25H18.75V15H22.5V11.25H37.5V15H41.25V11.25H48.75V22.5H52.5V11.25Z"
              fill="white"
            />
            <path
              d="M39.375 28.125L44.1544 37.3837L54.375 38.8669L46.875 46.0744L48.75 56.25L39.375 51.4462L30 56.25L31.875 46.0744L24.375 38.8669L34.875 37.3837L39.375 28.125Z"
              fill="white"
            />
          </svg>

          {/* Text */}
          <span className="text-white text-5xl font-['Karantina-light']">
            View All <span className="text-purple-500">Events</span>
          </span>

          {/* Arrow Icon */}
          <ArrowUpRight className="text-white ml-1" size={28} />
        </button>
      </div>
    </div>
  );
};

export default EventCarousel;