const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["comedy", "concerts"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  description: {
    type: String,
  },
  standTicket: {
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  vvipTicket: {
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  earlyBird: {
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  artistWalletAddress: {
    type: String,
    required: true,
  },
  ticketOpeningDate: {
    type: Date,
    required: true,
  },
  ticketClosingDate: {
    type: Date,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  queue: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fanscore: {
      type: Number,
      required: true,
    }
  }]
}, { timestamps: true });


module.exports = mongoose.model("Event", eventSchema);
