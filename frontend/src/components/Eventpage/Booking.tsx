import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface TicketType {
  type: string;
  price: number;
  capacity: number;
}

interface EventDetails {
  _id: string;
  artist: { name: string };
  standTicket: TicketType;
  vvipTicket: TicketType;
  earlyBird: TicketType;
}

interface BookingPageProps {
  onBookNow: () => void; // Prop to handle Book Now button click
  tickets: { type: string; quantity: number }[]; // Accept tickets as prop
  setTickets: React.Dispatch<React.SetStateAction<{ type: string; quantity: number }[]>>; // Accept setTickets function as prop
}

const BookingPage: React.FC<BookingPageProps> = ({ onBookNow, tickets, setTickets }) => {
  const { id: eventId } = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/events/${eventId}/details`
        );
        setEvent(response.data.event);
      } catch (err) {
        setError("Failed to fetch event details");
        console.error(err);
      }
    };

    if (eventId) fetchEventDetails();
  }, [eventId]);

  const handleQuantityChange = (type: string, change: number) => {
    setTickets((prevTickets) => {
      const existingTicket = prevTickets.find((ticket) => ticket.type === type);
      let updatedTickets = prevTickets.filter((ticket) => ticket.type !== type);

      if (existingTicket) {
        const newQuantity = existingTicket.quantity + change;
        if (newQuantity > 0) {
          updatedTickets.push({ type, quantity: newQuantity });
        }
      } else if (change > 0) {
        updatedTickets.push({ type, quantity: 1 });
      }

      // Calculate the new total price based on the updated tickets
      const newTotal = updatedTickets.reduce((sum, ticket) => {
        const ticketDetails = event?.[ticket.type as keyof EventDetails]; // Get ticket details from event
        return sum + (parseInt(ticketDetails?.price.toString() || "0") * parseInt(ticket.quantity.toString() || "0")); // Calculate total price
      }, 0);

      setTotal(newTotal);
      return updatedTickets;
    });
  };

  const handleBooking = () => {
    // Call the onBookNow function when the button is clicked
    onBookNow();
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!event) return <div className="p-4">Loading event details...</div>;

  return (
    <div className="p-4 max-w-full mx-auto flex gap-4">
      {/* Ticket Selection Container */}
      <div className="flex-grow border font-[Kanit-SemiBold] bg-gradient-to-r to-black from-[#FFEDED] max-w-5xl border-gray-600 rounded-xl p-6 shadow-lg ">
        {["standTicket", "vvipTicket", "earlyBird"].map((type) => {
          const ticket = event[type as keyof EventDetails] as TicketType;
          const selectedTicket = tickets.find((t) => t.type === type);
          return (
            <div key={type} className="bg-gradient-to-l to-[#FFFFFF] from-[#A14BFD] rounded-lg mb-3 p-3 flex justify-between items-center">
              <span className="text-black font-medium">
                {type.replace("Ticket", "").replace(/([A-Z])/g, ' $1').trim()} - ₹{ticket.price}
              </span>
              <div className="flex items-center gap-2">
                <button
                  className=" text-black w-6 h-6 rounded flex items-center justify-center"
                  onClick={() => handleQuantityChange(type, -1)}
                  disabled={!selectedTicket || selectedTicket.quantity <= 0}
                >
                  -
                </button>
                <span className="text-black text-xl">{selectedTicket?.quantity || 0}</span>
                <button
                  className=" text-black w-6 h-6 rounded flex items-center justify-center"
                  onClick={() => handleQuantityChange(type, 1)}
                  disabled={selectedTicket?.quantity === ticket.capacity}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between gap-12 p-6">
        {/* Left Column - Total Price */}
        <div className="flex flex-col justify-end">
          <div className="text-white border border-white rounded-2xl p-4">
            <h3 className="text-2xl font-[Kanit-Bold]">Total Price = {total}</h3>
          </div>
        </div>

        {/* Right Column - Starts From and Book Now */}
        <div className="flex flex-col items-center justify-end space-y-2">
          {/* Starts From Section */}
          <div className="text-white text-center">
            <h3 className="opacity-80 text-3xl font-[Kanit-Bold]">STARTS FROM</h3>
            <p className="text-4xl font-[Kanit-Bold]">
              ₹{Math.min(
                event.standTicket.price,
                event.vvipTicket.price,
                event.earlyBird.price
              )}
            </p>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBooking} // Call handleBooking on click
            className="bg-[#A14BFD] text-white text-4xl px-12 py-3 rounded-3xl font-[Karantina-Regular]"
            disabled={loading || tickets.length === 0}
          >
            {loading ? "Processing..." : "BOOK NOW"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
