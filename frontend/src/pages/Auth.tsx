import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Signup from '../components/Signup';
import guitarist from "../assets/Images/guitarist.png";
import SpotifyLogin from '../components/SpotifyAuth';

import { useNavigate } from 'react-router-dom';
import SuserData from '../components/SuserData';

interface UserProfile {
  display_name: string;
  images: { url: string }[];
  email: string;
  country: string;
}

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
}

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

const Auth = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  // const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  // const [topTracks, setTopTracks] = useState<Track[]>([]);
  // const [topArtists, setTopArtists] = useState<Artist[]>([]);
  // const [followedArtists, setFollowedArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (token) {
      fetchUserProfile(token);
      // fetchSpotifyData(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      console.log(data);
      setUserProfile(data);
      if (userProfile) {
        navigate('/user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchSpotifyData = async (token: string) => {
  //   try {
  //     setLoading(true);
  //     const [recentResponse, topResponse, topArtistsResponse, artistsResponse ] = await Promise.all([
  //       axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }),
  //       axios.get("https://api.spotify.com/v1/me/top/tracks?limit=10", {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }),
  //       axios.get("https://api.spotify.com/v1/me/top/artists?limit=10", {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }),
  //       axios.get("https://api.spotify.com/v1/me/following?type=artist", {
  //         headers: { Authorization: `Bearer ${token}` }
  //       })
  //     ]);

  //     setRecentTracks(recentResponse.data.items.map((item: { track: Track }) => item.track));
  //     setTopTracks(topResponse.data.items);
  //     setTopArtists(topArtistsResponse.data.items);
  //     setFollowedArtists(artistsResponse.data.artists.items);
  //   } catch (err) {
  //     setError('Failed to fetch Spotify data');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex justify-start gap-30">
        <img
          src={guitarist}
          alt="Guitarist"
          className="h-[700px] w-auto object-contain mt-[-4%]"
        />
        <div>
            <Signup userName={userProfile?.display_name || ""} email={userProfile?.email || ""} />
            {!userProfile && <SpotifyLogin/>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
