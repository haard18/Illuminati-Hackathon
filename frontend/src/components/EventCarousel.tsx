import { useEffect, useState } from "react";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Artist {
  name: string;
}

interface Event {
  _id: string;
  coverImage: string;
  artist: Artist;
  date: string;
  venue: string;
}

const EventCarousel: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/events/getAllEvents");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-black p-6 flex flex-col items-center mt-16">
      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-60 gap-y-14">
        {events.map((event: Event, ) => (
          <div
            key={event._id}
            className="relative flex items-center bg-[#FFE992] p-4 rounded-4xl shadow-lg w-[380px] h-[150px]"
          >
            <img
              src={event.coverImage}
              alt={event.artist.name}
              className="w-48 h-28 rounded-3xl object-cover"
            />
            <div className="ml-3 flex-1">
              <h3 className="text-3xl font-bold font-['Karantina-bold'] text-black leading-tight">
                {event.artist.name}
              </h3>
              <p className="text-black text-sm font-['Kanit']">{new Date(event.date).toDateString()}</p>
              <p className="text-black text-sm font-['Kanit']">{event.venue}</p>
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
                  className="font-['Karantina-bold']"
                  fontSize="30"
                  fontWeight="bold"
                  // fontFamily="Arial"
                >
                  GET TICKETS
                </text>
              </svg>
            </button>

            {/* More Details Button */}
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-[#FF895E] hover:bg-gray-900 hover:text-white text-black p-2 rounded-full outline-none focus:outline-none"
              onClick={() => navigate(`/event/${event._id}`)}
            >
              <ChevronRight size={26} />
            </button>
          </div>
        ))}
      </div>

      {/* View All Events Button */}
      <div className="w-full flex justify-start mt-10 pl-52 font-['Karantina-bold']">
        <button className="flex items-center text-white text-xl font-bold px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300">
          <ArrowUpRight className="text-white ml-1" size={28} />
          <span className="text-white text-5xl font-light ml-2">
            View All <span className="text-purple-500">Events</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default EventCarousel;
