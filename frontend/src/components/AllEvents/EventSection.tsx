import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import EventCard from './EventCard';

interface EventSectionProps {
  title: string;
}

const EventSection = ({ title }: EventSectionProps) => {
  const events = [
    {
      date: '25th February, 2025',
      artist: 'Mohit Chauhan',
      imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      date: '30th February, 2025',
      artist: 'Arijit Singh',
      imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <section className="px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-6xl font-['Karantina-bold'] text-white uppercase flex items-center">
            <span>Musical&nbsp;</span>
            <span style={{ color: '#FC75AB' }}>Events</span>
          </h2>
          <span className="text-[#FF4A2B] text-7xl">♪</span>
        </div>
        <button className="flex items-center gap-2 text-white font-['Karantina-Regular'] text-4xl">
          <span>See All</span>
          <ArrowUpRight size={60} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <EventCard
            key={event.artist}
            date={event.date}
            artist={event.artist}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default EventSection;
