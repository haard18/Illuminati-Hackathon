import React from 'react';
import Navbar from './Components/EventNavbar';
import EventCategories from './Components/EventCategories';
import EventSection from './Components/EventSection';

const Events = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <EventCategories />
      <EventSection title="Musical Events" />
    </div>
  );
};

export default Events;