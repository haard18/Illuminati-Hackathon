import { useState, useEffect } from "react";
import axios from "axios";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import bg from "../assets/dash.jpeg";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [isTopArtistsOpen, setIsTopArtistsOpen] = useState(false);
  const [isTopTracksOpen, setIsTopTracksOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/booking/getMyBookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on status
  const myTickets = bookings.filter((booking) => booking.status === "eligible");
  const appliedEvents = bookings.filter((booking) => booking.status === "queued");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white p-6">
        {/* Hero Banner */}
        <div
          className="h-48 rounded-3xl mb-8 relative overflow-hidden flex items-center"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 0 40px rgba(138, 43, 226, 0.2)",
          }}
        >
          <div className="absolute inset-0 bg-purple-900/50" />
          <h1 className="text-4xl font-bold absolute top-1/2 left-8 transform -translate-y-1/2 tracking-wider">
            WELCOME HARVI
          </h1>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-10 mb-8 px-3">
          <button className="py-5 px-3 rounded-xl flex items-center justify-between border-2 border-gray-700 w-[335px] transition bg-gradient-to-t from-[#2a2a2a] to-[#343434] backdrop-blur-sm hover:bg-purple-900/20">
            <span className="text-lg font-[Kanit-Regular]">My Tickets</span>
            <ChevronDown className="w-5 h-5" />
          </button>

          <button
            className="py-3 px-6 rounded-xl flex items-center justify-between border-2 border-gray-700 w-[335px] transition bg-gradient-to-t from-[#2a2a2a] to-[#343434] backdrop-blur-sm hover:bg-purple-900/20"
            onClick={() => setIsTopArtistsOpen(!isTopArtistsOpen)}
          >
            <span className="text-lg font-[Kanit-Regular]">Applied Events</span>
            {isTopArtistsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          <button className="py-5 px-3 rounded-xl flex items-center justify-between border-2 border-gray-700 w-[335px] transition bg-gradient-to-t from-[#2a2a2a] to-[#343434] backdrop-blur-sm hover:bg-purple-900/20">
            <span className="text-lg font-[Kanit-Regular]">Spotify Fandom</span>
          </button>
        </div>

        {/* My Tickets */}
        <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
        <div className="grid grid-cols-3 gap-6">
          {loading ? (
            <p>Loading tickets...</p>
          ) : myTickets.length === 0 ? (
            <p>No eligible tickets found.</p>
          ) : (
            myTickets.map((ticket) => (
              <div key={ticket._id} className="bg-zinc-900/50 rounded-2xl p-6 flex flex-col items-center backdrop-blur-sm border border-purple-500/10 hover:bg-purple-900/20 transition group">
                <img src={ticket.qrCode} alt={`QR Code for ${ticket.eventName}`} className="w-32 h-32 rounded-xl group-hover:scale-105 transition duration-300" />
                <h3 className="text-center text-2xl font-[Kanit-Regular] text-gray-200 mt-3">{ticket.eventName}</h3>
              </div>
            ))
          )}
        </div>

        {/* Applied Events */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Applied Events</h2>
        <div className="grid grid-cols-3 gap-6">
          {loading ? (
            <p>Loading applied events...</p>
          ) : appliedEvents.length === 0 ? (
            <p>No queued events found.</p>
          ) : (
            appliedEvents.map((event) => (
              <div key={event._id} className="bg-zinc-900/50 rounded-2xl p-6 flex flex-col items-center backdrop-blur-sm border border-purple-500/10 hover:bg-purple-900/20 transition group">
                <img src={event.qrCode} alt={`QR Code for ${event.eventName}`} className="w-32 h-32 rounded-xl group-hover:scale-105 transition duration-300" />
                <h3 className="text-center text-2xl font-[Kanit-Regular] text-gray-200 mt-3">{event.eventName}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
