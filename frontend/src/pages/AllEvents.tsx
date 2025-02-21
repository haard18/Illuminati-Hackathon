import React from 'react';

import Navbar from '../components/Navbar';
import EventCategories from '../components/AllEvents/EventCategories';
import EventSection from '../components/AllEvents/EventSection';
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