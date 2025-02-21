import React from 'react';
import { Heart } from 'lucide-react';
import GetTicketsIcon from '../assets/GetTickets.svg'; // Ensure the path is correct

interface EventCardProps {
  date: string;
  artist: string;
  imageUrl: string;
}

const EventCard = ({ date, artist, imageUrl }: EventCardProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg">
      <div className="absolute top-4 right-4 z-10">
        <button className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
          <Heart className="text-white" size={20} />
        </button>
      </div>

      <div className="absolute top-4 left-4 z-10">
        <img src={GetTicketsIcon} alt="Get Tickets" className="w-32" />
      </div>
      

      <img
        src={imageUrl}
        alt={artist}
        className="w-full h-[300px] object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <p className="text-white text-sm font-['Karantina-regular']">{date}</p>
        <h3 className="text-white text-xl font-['Karantina-bold'] uppercase">{artist}</h3>
      </div>
    </div>
  );
};

export default EventCard;
