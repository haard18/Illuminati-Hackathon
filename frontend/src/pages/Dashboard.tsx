import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import bg from "../assets/dash.jpeg"

const Dashboard = () => {
    const [isTopArtistsOpen, setIsTopArtistsOpen] = useState(false);
    const [isTopTracksOpen, setIsTopTracksOpen] = useState(false);

    const events = [
        { id: 1, name: "Coldplay X India", qrCode: "/api/placeholder/150/150" },
        { id: 2, name: "Millionaire Tour", qrCode: "/api/placeholder/150/150" },
        { id: 3, name: "Samay Raina Show", qrCode: "/api/placeholder/150/150" },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Hero Banner */}
            <div
                className="h-48 rounded-3xl mb-8 relative overflow-hidden flex items-center"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 0 40px rgba(138, 43, 226, 0.2)"
                }}
            >
                {/* Purple Overlay */}
                <div className="absolute inset-0 bg-purple-900/50" />

                {/* Light Beams */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute w-1 h-96 bg-purple-400 rotate-45 blur-lg -top-20 left-1/4" />
                    <div className="absolute w-1 h-96 bg-orange-400 -rotate-45 blur-lg -top-20 right-1/3" />
                    <div className="absolute w-1 h-96 bg-white rotate-12 blur-lg -top-20 right-1/4" />
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold absolute top-1/2 left-8 transform -translate-y-1/2 tracking-wider">
                    WELCOME HARVI
                </h1>
            </div>


            {/* Navigation Buttons */}
            <div className="grid grid-cols-3 gap-10 mb-8">
                <button className="py-5 px-6 rounded-xl flex items-center justify-between border-2 border-gray-700 transition
                   bg-gradient-to-t from-[#2a2a2a] to-[#343434] backdrop-blur-sm hover:bg-purple-900/20">
                    <span className="text-2xl font-[Kanit-Regular]">Tickets</span>
                    <ChevronDown className="w-5 h-5" />
                </button>

                <button
                    className="py-3 px-6 rounded-xl flex items-center justify-between border-2 border-gray-700 transition
               bg-gradient-to-t from-[#2a2a2a] to-[#343434] backdrop-blur-sm hover:bg-purple-900/20"
                    onClick={() => setIsTopArtistsOpen(!isTopArtistsOpen)}
                >
                    <span className="text-2xl font-[Kanit-Regular]">Top Artists</span>
                    {isTopArtistsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                <button
                    className="py-3 px-6 rounded-xl flex items-center justify-between border-2 border-gray-700 transition
               bg-gradient-to-t from-[#2a2a2a] to-[#343434] backdrop-blur-sm hover:bg-purple-900/20"
                    onClick={() => setIsTopTracksOpen(!isTopTracksOpen)}
                >
                    <span className="text-2xl font-[Kanit-Regular]">Top Tracks</span>
                    {isTopTracksOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

            </div>

            {/* Search Bar */}
            <div className="px-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by Name"
                        className="w-full bg-zinc-900 py-3 pl-12 pr-4 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-3 gap-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-zinc-900/50 rounded-2xl p-6 flex flex-col items-center backdrop-blur-sm border border-purple-500/10 hover:bg-purple-900/20 transition group"
                    >
                        <div className="relative mb-4">
                            <img
                                src={event.qrCode}
                                alt={`QR Code for ${event.name}`}
                                className="w-32 h-32 rounded-xl group-hover:scale-105 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition duration-300" />
                        </div>
                        <h3 className="text-center text-2xl font-[Kanit-Regular] text-gray-200">
                            {event.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;