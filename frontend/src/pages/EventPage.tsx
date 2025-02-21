import React, { useState } from 'react';
import Header from '../components/Eventpage/Header';
import tomorrowland from '../assets/Images/eventheader.svg';
import Description from '../components/Eventpage/Description';

const EventPage = () => {
  // State for dynamic title and description
  const [eventTitle, setEventTitle] = useState("TOMORROWLAND");
  const [eventDescription, setEventDescription] = useState("Join us for an unforgettable experience at Tomorrowland, featuring top DJs and an incredible atmosphere!");

  return (
    <div>
      <Header 
        imageUrl={tomorrowland}
        title={eventTitle} 
        date="26-28 June, 2025" 
        time="6pm to 11pm" 
        location="D.Y Patil Stadium" 
      />
      {/* Pass the dynamic title and event name to the Description component */}
      <Description title="Event Description" eventName={eventDescription} />
    </div>
  );
};

export default EventPage;
