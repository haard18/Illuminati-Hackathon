const express = require("express");
const bookingModel = require("../Models/BookingSchema");
const Event = require("../Models/EventModel");
const Bookingrouter = express.Router();
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
// const { authenticateUser } = require("./EventRouter");
// Create a new bookingModel
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token." });
  }
}

Bookingrouter.post("/makebooking", authenticateUser, async (req, res) => {
  try {
    const { eventId, tickets, fanscore, status } = req.body;
    console.log(req.body)
    // const userId = req.userId;
    const userId=req.userId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Ensure tickets array is not empty
    if (!tickets || tickets.length === 0) {
      return res.status(400).json({ error: "At least one ticket type is required" });
    }

    // Check and update ticket availability
    for (let ticket of tickets) {
      if (!["standTicket", "vvipTicket", "earlyBird"].includes(ticket.type)) {
        return res.status(400).json({ error: `Invalid ticket type: ${ticket.type}` });
      }

      if (event[ticket.type].capacity < ticket.quantity) {
        return res.status(400).json({ error: `Not enough ${ticket.type} tickets available` });
      }

      event[ticket.type].capacity -= ticket.quantity; // Reduce ticket count
    }

    // Check if user is already in queue
    const userInQueue = event.queue.some(q => q.userId.toString() === userId.toString());
    if (!userInQueue) {
      event.queue.push({ userId, fanscore });
    }

    // Save updated event details
    await event.save();

    // Save booking in Booking collection
    const newBooking = new bookingModel({
      buyer: userId,
      event: eventId,
      status:status,
      tickets,
    });

    await newBooking.save();

    return res.status(200).json({
      message: "User added to queue and booking recorded successfully.",
      event,
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error making booking:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
Bookingrouter.post('/updateBooking/:bookingId',async(req,res)=>{
    try{
      const {bookingId}=req.params;
      const {status,transactionHash}=req.body;
      const booking=await bookingModel.findByIdAndUpdate(bookingId,{status,transactionHash});
      return res.status(200).json({message:"Booking updated successfully",booking});
    }catch(error){
      console.error("Error making booking:", error);

      return res.status(500).json({error:error.message});
}
})
// Bookingrouter.post("/events/:eventId/queue", async (req, res) => {
//   try {
//     const { userId, fanscore } = req.body;
//     const { eventId } = req.params;

//     if (!userId || fanscore === undefined) {
//       return res.status(400).json({ error: "userId and fanscore are required." });
//     }

//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ error: "Event not found." });
//     }

//     // Check if user is already in the queue
//     const isUserInQueue = event.queue.some(q => q.userId.toString() === userId);
//     if (isUserInQueue) {
//       return res.status(400).json({ error: "User already in queue." });
//     }

//     // Push user to queue
//     event.queue.push({ userId, fanscore });
//     await event.save();

//     res.status(200).json({ message: "User added to queue successfully.", event });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



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
