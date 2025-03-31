import axios from "axios";
import { useEffect, useState } from "react";

const Fanscore = ({ artistName, eventId,  tickets, onClose }: { artistName: string, eventId: string,  tickets: { type: string; quantity: number }[], onClose: () => void }) => {
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

    useEffect(() => {
        console.log(tickets)
        const token = localStorage.getItem("spotify_access_token");
        if (token) {
            fetchSpotifyData(token);
        }
    }, []);

    const [recentTracks, setRecentTracks] = useState<Track[]>([]);
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [fanScore, setFanScore] = useState<number | null>(null);
    const [, setLoading] = useState(false);
    const [, setError] = useState<string | null>(null);
    const [queued, setQueued] = useState(false);

    const fetchSpotifyData = async (token: string) => {
        try {
            setLoading(true);
            const [recentResponse, topResponse, topArtistsResponse] = await Promise.all([
                axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get("https://api.spotify.com/v1/me/top/tracks?limit=10", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get("https://api.spotify.com/v1/me/top/artists?limit=10", {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setRecentTracks(recentResponse.data.items.map((item: { track: Track }) => item.track));
            setTopTracks(topResponse.data.items);
            setTopArtists(topArtistsResponse.data.items);
        } catch (err) {
            setError("Failed to fetch Spotify data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateFanscore = () => {
        let score = 100;
        let found = false;

        for (let i = 0; i < recentTracks.length; i++) {
            if (recentTracks[i].artists[0].name === artistName) {
                score -= i;
            }
        }

        for (let i = 0; i < topTracks.length; i++) {
            if (topTracks[i].artists[0].name === artistName) {
                score -= i;
                found = true;
            }
        }

        for (let i = 0; i < topArtists.length; i++) {
            if (topArtists[i].name === artistName) {
                score -= i;
                found = true;
            }
        }

        if (!found) {
            score = 0;
        }

        setFanScore(score);
        console.log("Calculated fanscore:", score);
    };

    const handleQueueBooking = async () => {
        if (!fanScore) return;
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.post(
                "http://localhost:3000/bookings/makebooking",
                {
                    eventId,
                    tickets:tickets,
                    fanscore: fanScore,
                    status: "queued"
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            alert(response.data.message);
            setQueued(true);
        } catch (error) {
            console.error("Error placing booking in queue", error);
            alert("Failed to place booking in queue");
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 scale-100 relative">
                <span className="absolute top-2 right-2 cursor-pointer text-xl" onClick={onClose}>&times;</span>
                <h2 className="text-lg font-bold">Fanscore Result</h2>
                <p>Your fanscore is: {fanScore !== null ? fanScore : "Not calculated yet"}</p>

                <button
                    onClick={calculateFanscore}
                    className="mt-4 bg-gradient-to-b from-black to-[#A14bfd] text-white px-4 py-2 rounded"
                >
                    Recalculate Fanscore
                </button>

                {fanScore !== null && !queued && (
                    <button
                        onClick={handleQueueBooking}
                        className="mt-4 bg-[#A14bfd] text-white px-4 py-2 rounded w-full"
                    >
                        Join Queue
                    </button>
                )}

                {queued && <p className="mt-4 text-green-500">You have been placed in the queue!</p>}
            </div>
        </div>
    );
};

export default Fanscore;