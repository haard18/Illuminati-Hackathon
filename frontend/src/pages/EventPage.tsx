import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Eventpage/Header';
import Description from '../components/Eventpage/Description';
import { useParams } from 'react-router-dom';

interface ArtistDetails {
  name: string;
}

interface EventDetails {
  _id: string;
  coverImage: string;
  artist: ArtistDetails;
  date: string;
  venue: string;
  description?: string;
}

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/${id}/details`);
        setEvent(response.data.event);
      } catch (err) {
        setError('Failed to fetch event details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div>
      <div className="relative h-[400px] w-full overflow-hidden">
        {/* Image with gradient mask */}
        <div className="absolute inset-0">
          <img
            src={event.coverImage}
            alt={event.artist.name}
            className="w-full h-full object-cover"
          />
          {/* Stronger gradient mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>
        {/* Header content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <div className="eventdetails flex flex-col gap-y-2">
          <h1 className="text-4xl font-bold mb-2">{event.artist.name}</h1>
          <div className="timings flex flex-row gap-12">
          <p className="text-lg mb-1">{new Date(event.date).toDateString()}</p>
          <p className="text-lg">6pm to 11pm</p>
          <p className="text-lg mt-2">{event.venue}</p>
          </div>
          </div>
        </div>
      </div>
      <Description 
        title="Event Description" 
        eventName={event.description || "No description available"} 
      />
    </div>
  );
};

export default EventPage;
