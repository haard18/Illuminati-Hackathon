import React from 'react';

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

interface UserProfile {
  display_name: string;
  images: { url: string }[];
  email: string;
  country: string;
}

interface SuserDataProps {
  userProfile: UserProfile;
  recentTracks: Track[];
  topTracks: Track[];
  topArtists: Artist[];
  followedArtists: Artist[];
  loading: boolean;
  error: string | null;
}

const SuserData = ({
  userProfile,
  recentTracks,
  topTracks,
  topArtists,
  followedArtists,
  loading,
  error
}: SuserDataProps) => {
  return (
    <div className="text-white p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Welcome, {userProfile.display_name}!</h2>
        <img
          src={userProfile.images[0]?.url}
          alt="Profile"
          className="w-20 h-20 rounded-full my-2"
        />
        <p>{userProfile.email}</p>
        <p>{userProfile.country}</p>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="space-y-8">
          {/* Recently Played Tracks */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTracks.slice(0, 6).map((track) => (
                <div key={track.id} className="p-4 bg-gray-800 rounded-lg">
                  <img 
                    src={track.album.images[0]?.url} 
                    alt={track.album.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold">{track.name}</h3>
                  <p className="text-gray-400">{track.artists.map(a => a.name).join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Tracks */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Top Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topTracks.map((track) => (
                <div key={track.id} className="p-4 bg-gray-800 rounded-lg">
                  <img 
                    src={track.album.images[0]?.url} 
                    alt={track.album.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold">{track.name}</h3>
                  <p className="text-gray-400">{track.artists.map(a => a.name).join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Artists */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Top Artists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topArtists.map((artist) => (
                <div key={artist.id} className="p-4 bg-gray-800 rounded-lg">
                  <img 
                    src={artist.images[0]?.url} 
                    alt={artist.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold">{artist.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Followed Artists */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Followed Artists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {followedArtists.map((artist) => (
                <div key={artist.id} className="p-4 bg-gray-800 rounded-lg">
                  <img 
                    src={artist.images[0]?.url} 
                    alt={artist.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold">{artist.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuserData; 