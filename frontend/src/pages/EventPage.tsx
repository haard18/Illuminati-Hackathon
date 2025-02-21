import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Eventpage/Header';
import Description from '../components/Eventpage/Description';
import BookingPage from '../components/Eventpage/Booking';

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
      {/* Header with event details */}
      <Header 
        imageUrl={event.coverImage} 
        title={event.artist.name} 
        date={new Date(event.date).toDateString()} 
        time="6 PM to 11 PM" // You can adjust this as needed
        location={event.venue} 
        onBack={() => window.history.back()} // Optional back button functionality
      />

      {/* Event Description placed just below the header */}
      <div className="bg-gradient-to-b from-black to-[#A14bfd] p-6">
        <Description 
          title="Event Description" 
          eventName={event.description || "No description available"} 
          
        />
        <hr className='' />
        <BookingPage/>
      </div>
    </div>
  );
};

export default EventPage;
