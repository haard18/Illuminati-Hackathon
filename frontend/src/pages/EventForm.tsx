import React from 'react';
import { Clock, Calendar, ChevronUp, ChevronDown } from 'lucide-react';

const EventForm = () => {
  return (
    <div
      className="h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #000000 95%, #A14BFD 200%)",
      }}
    >
      {/* Navbar */}
      <nav className="px-4 py-4 flex justify-between items-center bg-black">
        {/* Left Arrow Icon Button */}
        <button className="p-2 hover:bg-white/10 rounded-full transition flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 81 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M50.625 13.5L57.375 20.25L37.125 40.5L57.375 60.75L50.625 67.5L23.625 40.5L50.625 13.5Z"
              fill="white"
            />
          </svg>
        </button>

        {/* New Close Icon Button */}
        <button className="p-2 hover:bg-white/10 rounded-full transition flex items-center justify-center">
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.1666 34.1666L6.83325 6.83325M34.1666 6.83325L6.83325 34.1666"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-4xl mx-auto">
          {/* CREATE AN EVENT Text */}
          <h1
            className="font-[karantina-Regular] text-[40px] leading-[40px] mt-4 mb-6"
            style={{
              background: "linear-gradient(174.33deg, #A14BFD 4.49%, #FFFFFF 95.51%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CREATE AN EVENT
          </h1>

          {/* Form Content */}
          <form className="space-y-4 font-[Kanit-Regular]">
            {/* Event Name */}
            <div className="space-y-1">
              <label className="block text-gray-300">Event Name</label>
              <input
                type="text"
                placeholder="Enter Your Event Name Here"
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-gray-300">Add Description</label>
              <textarea
                placeholder="Add Your Event Description Here"
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 resize-none h-16 inner-shadow"
              />
            </div>

            {/* Date, Time, and Duration Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Date */}
              <div className="space-y-1">
                <label className="block text-gray-300">Date</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="March 15, 2025"
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white pr-12"
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              {/* Time */}
              <div className="space-y-1">
                <label className="block text-gray-300">Time</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="6:00 PM"
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white pr-12"
                  />
                  <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className="block text-gray-300">Duration</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="3h 45m"
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white pr-12"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-1">
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="block text-gray-300">Location</label>
              <input
                type="text"
                placeholder="Choose Your Event Location Here"
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400"
              />
            </div>

            {/* Ticket Prices and Attachments Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Upload Attachments */}
              <div>
                <label className="block text-gray-300 mb-1">Upload Attachments</label>
                <button className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left">
                  Select Files
                </button>
              </div>

              {/* General Ticket Price */}
              <div>
                <label className="block text-gray-300 mb-1">General Ticket Price</label>
                <button className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left">
                  Select Files
                </button>
              </div>

              {/* Fanpit Ticket Price */}
              <div>
                <label className="block text-gray-300 mb-1">Fanpit Ticket Price</label>
                <button className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left">
                  Select Files
                </button>
              </div>

              {/* V.I.P Ticket Price */}
              <div>
                <label className="block text-gray-300 mb-1">V.I.P Ticket Price</label>
                <button className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left">
                  Select Files
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-2">
              <button
                type="button"
                className="px-6 py-2 bg-gray-600 rounded-lg text-white font-medium"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 rounded-lg text-white font-medium"
              >
                CREATE EVENT
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom CSS for Inner Shadow */}
      <style>
        {`
          .inner-shadow {
            box-shadow: inset 0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
        `}
      </style>
    </div>
  );
};

export default EventForm;