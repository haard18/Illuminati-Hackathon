const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  spotifyUrl: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  events:{
    type: Array,
    default:[]
  }
}, { timestamps: true });

module.exports = mongoose.model("Artist", artistSchema);
