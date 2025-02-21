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
  const [tickets, setTickets] = useState<{ type: string; quantity: number }[]>(
    []
  );
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

      // Calculate new total
      const newTotal = updatedTickets.reduce(
        (sum, ticket) =>
          sum +
          (ticket.type === "standTicket"
            ? event?.standTicket.price || 0
            : ticket.type === "vvipTicket"
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
        buyer: "user_wallet_address", // Replace with actual user data
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

  if (error) return <div>{error}</div>;
  if (!event) return <div>Loading event details...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center">{event.artist.name} - Booking</h2>

      {/* Ticket Selection Container */}
      <div className="mt-6 bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        {["standTicket", "vvipTicket", "earlyBird"].map((type) => {
          const ticket = event[type as keyof EventDetails] as TicketType;
          const selectedTicket = tickets.find((t) => t.type === type);
          return (
            <div key={type} className="flex justify-between items-center p-3 border-b">
              <span className="font-semibold text-lg">
                {type.replace("Ticket", "")} - ₹{ticket.price}
              </span>

              {/* Increment & Decrement Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => handleQuantityChange(type, ticket.price, -1)}
                  disabled={!selectedTicket || selectedTicket.quantity <= 0}
                >
                  -
                </button>
                <span className="text-xl font-semibold">{selectedTicket?.quantity || 0}</span>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-md"
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

      {/* Total Amount */}
      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold">Total: ₹{total}</h3>
      </div>

      {/* Booking Button */}
      <button
        onClick={handleBooking}
        className="bg-purple-600 text-white p-3 mt-4 w-full rounded-lg shadow-md hover:bg-purple-700 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Book Now"}
      </button>
    </div>
  );
};

export default BookingPage;
