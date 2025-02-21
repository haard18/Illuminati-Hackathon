import React from 'react';

const CLIENT_ID = "7d515a5f97034139853e89c1ccfa1f09";
const REDIRECT_URI = "http://localhost:5173/callback";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-recently-played",
  "user-follow-read",
].join("%20"); // Space-separated permissions
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;

const SpotifyLogin = () => {
  const handleLogin = () => {
    window.location.href = AUTH_URL;
  };

  return (
    <button onClick={handleLogin} className="bg-green-500 text-white p-3 rounded-lg">
      Connect with Spotify
    </button>
  );
};

export default SpotifyLogin;
