const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    buyer: {
      type: String,
      required: true, // Wallet address of buyer
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true, // Link to the Event model (ObjectId)
    },
    total: {
      type: Number,
      required: true,
      min: 1, // Ensure total price is at least 1
    },
    transactionHash: {
      type: String,
      required: true,
      unique: true, // Ensure transactionHash is unique
    },
    tickets: [
      {
        type: {
          type: String,
          enum: ["standTicket", "vvipTicket", "earlyBird"], // Only valid ticket types
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Quantity must be at least 1
        },
        price: {
          type: Number,
          required: true,
          min: 1, // Ensure ticket price is positive
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
