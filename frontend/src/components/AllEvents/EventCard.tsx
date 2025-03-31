
import { Heart } from "lucide-react";

interface EventCardProps {
  date: string;
  artist: string;
  imageUrl: string;
}

const EventCard = ({ date, artist, imageUrl }: EventCardProps) => {
  return (
    <div className="relative">
      {/* Outer div to keep rounded corners */}
      <div className="relative rounded-2xl shadow-lg border border-gray-600 bg-black">
        {/* "Get Tickets" Banner - Now fully visible */}
        <div className="absolute -top-4 -left-12 z-20">
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
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
          <button className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
            <Heart className="text-white" size={20} />
          </button>
        </div>

        {/* Event Image */}
        <img
          src={imageUrl}
          alt={artist}
          className="w-full h-[300px] object-cover rounded-2xl"
        />

        {/* Event Details */}
        <div className="absolute bottom-0 left-2 right-0 p-8">
        <p className="text-white text-3xl font-['Karantina-regular']">{date}</p>
        <h3 className="text-white text-4xl font-['Karantina-bold'] uppercase">
          {artist}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
