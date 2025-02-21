import React from 'react';

import Navbar from '../components/Navbar';

import SearchBar from '../components/AllEvents/EventNavbar';
import EventCategories from '../components/AllEvents/EventCategories';
import EventSection from '../components/AllEvents/EventSection';
const Events = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="mt-6"> {/* Adjust the margin-top value as needed */}
        <SearchBar />
      </div>
      <EventCategories />
      <EventSection title="Musical Events" />
    </div>
  );
};


export default Events;