const express = require("express");
const jwt = require("jsonwebtoken");
const Event = require("../Models/EventModel");
const Artist = require("../Models/ArtistModel");
require("dotenv").config();

const Eventrouter = express.Router();

// Middleware to verify JWT token and extract artist ID
const authenticateArtist = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.artistId = decoded.artistId; // Store artistId in request object
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token." });
  }
};

// Create an Event for the authenticated artist
Eventrouter.post("/addEvent", async (req, res) => {
  try {
    const {
      type,
      date,
      venue,
      artistId, // Expecting artist ID instead of name
      description,
      standTicket,
      vvipTicket,
      earlyBird,
      ticketOpeningDate,
      ticketClosingDate,
      coverImage,
    } = req.body;

    // Ensure all required fields are present
    if (!type || !date || !venue || !artistId || !standTicket || !vvipTicket || !earlyBird || !ticketOpeningDate || !ticketClosingDate || !coverImage) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find the artist using their ID
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    // Create new event
    const event = new Event({
      type,
      date,
      venue,
      artist: artist._id, // Link event to artist using ObjectId
      description,
      standTicket,
      vvipTicket,
      earlyBird,
      artistWalletAddress: artist.walletAddress, // Use wallet address from artist's profile
      ticketOpeningDate,
      ticketClosingDate,
      coverImage,
    });

    await event.save();

    // Update artist's event list
    artist.events.push(event._id);
    await artist.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Eventrouter.get("/getAllEvents", async (req, res) => {
  try {
    const events = await Event.find().populate({
      path: 'artist',
      select: '-password -email -events -spotifyUrl -updatedAt' // Excluded -createdAt and -__v
    });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available tickets for an event
Eventrouter.get("/:eventId/available-tickets", async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Extract available ticket details
    const availableTickets = {
      standTicket: {
        capacity: event.standTicket.capacity,
        price: event.standTicket.price,
      },
      vvipTicket: {
        capacity: event.vvipTicket.capacity,
        price: event.vvipTicket.price,
      },
      earlyBird: {
        capacity: event.earlyBird.capacity,
        price: event.earlyBird.price,
      },
    };

    res.status(200).json({ eventId, availableTickets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Eventrouter.get("/:eventId/details", async (req, res) => {
  try {
    const { eventId } = req.params;
    // Populate artist details when finding the event, excluding sensitive fields
    const event = await Event.findById(eventId).populate({
      path: 'artist',
      select: '-password -email -events -spotifyUrl' // Exclude sensitive fields
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = Eventrouter;

