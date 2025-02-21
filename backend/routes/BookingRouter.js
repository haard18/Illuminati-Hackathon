const express = require("express");
const bookingModel = require("../Models/BookingSchema");
const Event = require("../Models/EventModel");
const Bookingrouter = express.Router();
const mongoose = require("mongoose");
// Create a new bookingModel
Bookingrouter.post("/makebooking", async (req, res) => {
    try {
      const { buyer, eventId, total, transactionHash, tickets,status } = req.body;
  
      // Validate input
      if (!buyer || !eventId || !total || !transactionHash || !tickets.length) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // Ensure eventId is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID" });
      }
  
      // Find the event using the validated eventId
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      // Calculate the total price based on selected tickets
      let calculatedTotal = 0;
      for (const ticket of tickets) {
        if (!["standTicket", "vvipTicket", "earlyBird"].includes(ticket.type)) {
          return res.status(400).json({ error: `Invalid ticket type: ${ticket.type}` });
        }
  
        // Get the price for the selected ticket type from the event
        const ticketPrice = event[ticket.type].price;
        if (!ticketPrice) {
          return res.status(400).json({ error: `Price for ${ticket.type} not found` });
        }
  
        // Add the ticket's cost to the total price
        ticket.price = ticketPrice;  // Assign the price dynamically
  
        // Check if enough tickets are available
        if (event[ticket.type].capacity < ticket.quantity) {
          return res.status(400).json({ error: `Not enough ${ticket.type} tickets available` });
        }
  
        // Deduct the booked tickets from event
        event[ticket.type].capacity -= ticket.quantity;
  
        // Add to the calculated total
        calculatedTotal += ticketPrice * ticket.quantity;
      }
  
      // Validate if the total provided matches the calculated total
      if (calculatedTotal !== total) {
        return res.status(400).json({ error: "Total price does not match the calculated ticket price" });
      }
  
      // Save updated event
      await event.save();
  
      // Create a new booking
      const booking = new bookingModel({
        buyer,
        event: eventId, // Use ObjectId for event
        total,
        transactionHash,
        tickets,
      });
  
      await booking.save();
      res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

// Get all bookings for an event
Bookingrouter.get("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    const bookings = await bookingModel.find({ event: eventId }).populate("event", "artist venue date");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = Bookingrouter;
