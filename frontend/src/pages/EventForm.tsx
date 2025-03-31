import  { useState } from 'react';
import { Clock, Calendar, ChevronUp, ChevronDown } from 'lucide-react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    venue: '',
    artistId: '',
    description: '',
    standTicket: { price: '', capacity: '' },
    vvipTicket: { price: '', capacity: '' },
    earlyBird: { price: '', capacity: '' },
    ticketOpeningDate: '',
    ticketClosingDate: '',
    coverImage: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
// @ts-ignore
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      // Handle nested fields
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        return {
          ...prevData,
          [parent]: {
            // @ts-ignore
            ...prevData[parent],
            [child]: value,
          },
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
// @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for missing required fields
    const requiredFields = [
      'type', 'date', 'venue', 'artistId',
      'standTicket.price', 'standTicket.capacity',
      'vvipTicket.price', 'vvipTicket.capacity',
      'earlyBird.price', 'earlyBird.capacity',
      'ticketOpeningDate', 'ticketClosingDate', 'coverImage'
    ];

    const missingFields = requiredFields.filter(field => {
      // @ts-ignore
      const value = field.includes('.') ? field.split('.').reduce((obj, key) => obj[key], formData) : formData[field];
      return !value;
    });

    if (missingFields.length > 0) {
      setResponseMessage(`Error: Missing required fields - ${missingFields.join(', ')}`);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/events/addEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage(result.message);
      } else {
        setResponseMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      // @ts-expect-error:ERROR
      setResponseMessage(`Error: ${error.message}`);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-4 font-[Kanit-Regular]">
            {/* Event Name */}
            <div className="space-y-1">
              <label className="block text-gray-300">Event Type</label>
              <select
                name="type"
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Event Type</option>
                <option value="concerts">Concert</option>
                <option value="comedy">Comedy</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-gray-300">Add Description</label>
              <textarea
                name="description"
                placeholder="Add Your Event Description Here"
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 resize-none h-16 inner-shadow"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Date, Time, and Duration Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Date */}
              <div className="space-y-1">
                <label className="block text-gray-300">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white pr-12"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              {/* Ticket Opening Date */}
              <div className="space-y-1">
                <label className="block text-gray-300">Ticket Opening Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="ticketOpeningDate"
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white pr-12"
                    value={formData.ticketOpeningDate}
                    onChange={handleChange}
                  />
                  <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              {/* Ticket Closing Date */}
              <div className="space-y-1">
                <label className="block text-gray-300">Ticket Closing Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="ticketClosingDate"
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white pr-12"
                    value={formData.ticketClosingDate}
                    onChange={handleChange}
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
                name="venue"
                placeholder="Choose Your Event Location Here"
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>

            {/* Artist ID */}
            <div className="space-y-1">
              <label className="block text-gray-300">Artist ID</label>
              <input
                type="text"
                name="artistId"
                placeholder="Enter Artist ID"
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400"
                value={formData.artistId}
                onChange={handleChange}
              />
            </div>

            {/* Ticket Prices and Attachments Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Cover Image URL */}
              <div>
                <label className="block text-gray-300 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  name="coverImage"
                  placeholder="Cover Image URL"
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left"
                  value={formData.coverImage}
                  onChange={handleChange}
                />
              </div>

              {/* General Ticket Price and Capacity */}
              <div>
                <label className="block text-gray-300 mb-1">General Ticket</label>
                <input
                  type="number"
                  name="standTicket.price"
                  placeholder="Price"
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left mb-2"
                  value={formData.standTicket.price}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="standTicket.capacity"
                  placeholder="Capacity"
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left"
                  value={formData.standTicket.capacity}
                  onChange={handleChange}
                />
              </div>

              {/* Fanpit Ticket Price and Capacity */}
              <div>
                <label className="block text-gray-300 mb-1">Fanpit Ticket</label>
                <input
                  type="number"
                  name="earlyBird.price"
                  placeholder="Price"
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left mb-2"
                  value={formData.earlyBird.price}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="earlyBird.capacity"
                  placeholder="Capacity"
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left"
                  value={formData.earlyBird.capacity}
                  onChange={handleChange}
                />
              </div>

              {/* V.I.P Ticket Price and Capacity */}
              <div>
                <label className="block text-gray-300 mb-1">V.I.P Ticket</label>
                <input
                  type="number"
                  name="vvipTicket.price"
                  placeholder="Price"
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left mb-2"
                  value={formData.vvipTicket.price}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="vvipTicket.capacity"
                  placeholder="Capacity"
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-400 text-left"
                  value={formData.vvipTicket.capacity}
                  onChange={handleChange}
                />
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

          {/* Response Message */}
          {responseMessage && (
            <div className="mt-4 text-white">{responseMessage}</div>
          )}
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
