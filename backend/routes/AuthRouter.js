const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const Artist = require("../Models/ArtistModel");
require("dotenv").config(); // Load environment variables

const Userrouter = express.Router();

Userrouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, walletAddress,spotifyUrl,boolType} = req.body;
    if(boolType==="artist"){
      // const {name, email, password, walletAddress,spotifyUrl,boolType} = req.body;
      const existingArtist=await Artist.findOne({
        walletAddress:walletAddress
      })
      if(existingArtist){
        return res.status(400).json({ error: "Artist already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const artist=new Artist({
        name,
        email,
        spotifyUrl,
        walletAddress,
        password:hashedPassword

      })
      await artist.save();
      const token = jwt.sign(
        { artistId: artist._id, email: artist.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.status(201).json({
        message: "Artist created successfully",
        artist: { name: artist.name, email: artist.email, walletAddress: artist.walletAddress },
        token,
      });
    }
    // Ensure all required fields are present
    if (!name || !email || !password || !walletAddress) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      walletAddress,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    res.status(201).json({
      message: "User created successfully",
      user: { name: user.name, email: user.email, walletAddress: user.walletAddress },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
Userrouter.post("/login", async (req, res) => {
  try {
    const { email, password,boolType } = req.body;
    // console.log(boolType,email,password)
    if(boolType==="artist"){
      const artist = await Artist.findOne({ email })

      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
      // console.log(artist)
      const isPasswordValid = await bcrypt.compare(password, artist.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const token = jwt.sign(
        { artistId: artist._id},
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.status(200).json({
        // message: "Artist logged in successfully",
        // artist: { name: artist.name, email: artist.email, walletAddress: artist.walletAddress },
        token,
      });
    }
    // Find user by email
    const user = await User.findOne({ email }).select("+password").exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
  
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    res.status(200).json({
      message: "User logged in successfully",
      user: { name: user.name, email: user.email, walletAddress: user.walletAddress },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = Userrouter;
