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

const BookingPage = () => {
  const { id: eventId } = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [tickets, setTickets] = useState<{ type: string; quantity: number }[]>([]);
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

  const handleQuantityChange = (type: string, price: number, change: number) => {
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

      const newTotal = updatedTickets.reduce(
        (sum, ticket) =>
          sum +
          (ticket.type === "StandTicket"
            ? event?.standTicket.price || 0
            : ticket.type === "VVIPTicket"
              ? event?.vvipTicket.price || 0
              : event?.earlyBird.price || 0) * ticket.quantity,
        0
      );

      setTotal(newTotal);
      return updatedTickets;
    });
  };

  const handleBooking = async () => {
    if (!eventId || tickets.length === 0 || total === 0) {
      alert("Please select tickets before booking.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/booking/makebooking", {
        buyer: "user_wallet_address",
        eventId,
        total,
        transactionHash: "dummy_hash",
        tickets,
        status: "pending",
      });
      alert("Booking successful!");
    } catch (err) {
      alert("Booking failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
                  onClick={() => handleQuantityChange(type, ticket.price, -1)}
                  disabled={!selectedTicket || selectedTicket.quantity <= 0}
                >
                  -
                </button>
                <span className="text-black text-xl">{selectedTicket?.quantity || 0}</span>
                <button
                  className=" text-black w-6 h-6 rounded flex items-center justify-center"
                  onClick={() => handleQuantityChange(type, ticket.price, 1)}
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
          <div className="text-white  border border-white rounded-2xl p-4">
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
            className="bg-[#A14BFD] text-white text-4xl px-12 py-3 rounded-3xl font-[Karantina-Regular]"
            onClick={handleBooking}
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
