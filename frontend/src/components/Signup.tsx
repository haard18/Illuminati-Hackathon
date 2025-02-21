import React, { useState } from "react";
import registerSpotify from "../assets/Images/Registerspotify.png";
import spotifyLogo from "../assets/Images/spotifylogo.png";
import axios from "axios";

interface SignupProps {
  userName: string;
  email: string;
}

const Signup: React.FC<SignupProps> = ({ userName, email }) => {
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [userType, setUserType] = useState("user"); // "user" or "artist"
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress || !password) {
      setError("Wallet Address and Password are required.");
      return;
    }

    const signupData: any = {
      name: userName,
      email: email,
      password: password,
      walletAddress: walletAddress,
      boolType: userType,
    };

    if (userType === "artist") {
      signupData.spotifyUrl = spotifyUrl;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", signupData);
      console.log("Signup successful:", response.data);

      // Store token in local storage
      localStorage.setItem("authToken", response.data.token);

      // Show success message
      setSuccessMessage("Signup successful! Redirecting...");
      setError(null);

      // Redirect or perform post-signup actions here
      setTimeout(() => {
        window.location.href = "/dashboard"; // Change to your actual dashboard route
      }, 2000);
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[#D9D9D9] p-8 rounded-2xl shadow-lg w-[400px] flex flex-col items-center">
        {/* Logo Section */}
        <div className="flex flex-row gap-4 w-full justify-start items-center mb-6">
          <img src={spotifyLogo} alt="Spotify Logo" className="h-16 w-16" />
          <img src={registerSpotify} alt="Spotify Register" className="h-16" />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-3">{successMessage}</p>}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Username Field */}
          <label className="block text-gray-700 font-semibold mb-1">Username</label>
          <input
            type="text"
            value={userName}
            disabled
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 bg-gray-300 text-gray-700 cursor-not-allowed"
          />

          {/* Email Field */}
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 bg-gray-300 text-gray-700 cursor-not-allowed"
          />

          {/* Password Field */}
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 bg-[#9C9A9A] text-white placeholder-white/70 focus:outline-none focus:border-[#1DB954]"
          />

          {/* Wallet Address Field */}
          <label className="block text-gray-700 font-semibold mb-1">Wallet Address</label>
          <input
            type="text"
            placeholder="Enter your wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 bg-[#9C9A9A] text-white placeholder-white/70 focus:outline-none focus:border-[#1DB954]"
          />

          {/* User Type Selection */}
          <label className="block text-gray-700 font-semibold mb-1">Sign up as:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 bg-[#9C9A9A] text-white focus:outline-none focus:border-[#1DB954]"
          >
            <option value="user">User</option>
            <option value="artist">Artist</option>
          </select>

          {/* Show Spotify URL only for Artists */}
          {userType === "artist" && (
            <>
              <label className="block text-gray-700 font-semibold mb-1">Spotify URL</label>
              <input
                type="text"
                placeholder="Enter your Spotify URL"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-3 bg-[#9C9A9A] text-white placeholder-white/70 focus:outline-none focus:border-[#1DB954]"
              />
            </>
          )}

          {/* Sign Up Button */}
          <button type="submit" className="w-full bg-[#1DB954] text-white py-3 rounded-lg font-bold hover:bg-[#1aa94c]">
            Sign Up
          </button>
        </form>

        {/* Already Registered Section */}
        <p className="mt-4 text-gray-600 text-sm">
          Already registered?{" "}
          <a href="/login" className="text-[#1DB954] font-bold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
