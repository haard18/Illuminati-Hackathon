import React from "react";
import registerSpotify from "../assets/Images/Registerspotify.png";
import spotifyLogo from "../assets/Images/spotifylogo.png";

const Signup = ({ userName, email }: { userName: string; email: string }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[#D9D9D9] p-8 rounded-2xl shadow-lg w-[400px] flex flex-col items-center">
        {/* Logo Section */}
        <div className="flex flex-row gap-4 w-full justify-start items-center mb-6">
          <img src={spotifyLogo} alt="Spotify Logo" className="h-16 w-16" />
          <img src={registerSpotify} alt="Spotify Register" className="h-16" />
        </div>

        {/* Form Section */}
        <form className="w-full">
          {/* Username Field */}
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={userName}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 bg-[#9C9A9A] text-white placeholder-white/70 focus:outline-none focus:border-[#1DB954]"
          />

          {/* Email Field */}
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 bg-[#9C9A9A] text-white placeholder-white/70 focus:outline-none focus:border-[#1DB954]"
          />

          {/* Password Field */}
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-5 bg-[#9C9A9A] text-white placeholder-white/70 focus:outline-none focus:border-[#1DB954]"
          />

          {/* Sign Up Button */}
          <button className="w-full bg-[#1DB954] text-white py-3 rounded-lg font-bold hover:bg-[#1aa94c]">
            Sign Up
          </button>
        </form>

        {/* Already Registered Section */}
        <p className="mt-4 text-gray-600 text-sm">
          Already registered?{" "}
          <a href="#" className="text-[#1DB954] font-bold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
