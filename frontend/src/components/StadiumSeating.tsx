import React from 'react';
import seats from '../assets/seats.png';
import bg from '../assets/bg.png'; // Import the background image

const StadiumSeating = () => {
    const sections = [
        { id: 'A', range: '10 23-45', color: 'bg-blue-800' },
        { id: 'B', range: '10 53-85', color: 'bg-blue-400' },
        { id: 'C', range: '10 113-145', color: 'bg-blue-200' },
        { id: 'E', range: '10 153-165', color: 'bg-cyan-300' },
        { id: 'F', range: '10 173-195', color: 'bg-teal-700' },
        { id: 'G', range: '10 203-245', color: 'bg-teal-500' }
    ];

    return (    
        <div 
            className="relative w-full h-screen p-8"
            style={{ 
                backgroundImage: `url(${bg})`, // Set the background image
                backgroundSize: 'cover', // Ensure the image covers the entire background
                backgroundPosition: 'center', // Center the background image
            }}
        >
            {/* Event Details */}
            <div className="absolute top-8 left-8 text-white mt-34">
                <h1 className="text-8xl font-[Karantina-Regular] tracking-wider mb-1">COLDPLAY X</h1>
                <h1 className="text-8xl font-[Karantina-Regular] tracking-wider mb-4">INDIA</h1>
                <h2 className="text-6xl font-[Karantina-Light] mb-6">MUSIC OF SPHERES</h2>
                <div className="space-y-1">
                    <p className="text-2xl font-[Kanit-Thin]">Saturday, 25 January</p>
                    <p className="text-2xl font-[Kanit-Thin]">6:00 pm</p>
                    <p className="text-2xl font-[Kanit-Thin]">Mumbai, Maharashtra</p>
                </div>
            </div>

            {/* Stadium Layout */}
            <div className="flex justify-center items-center h-full">
                <div className="relative w-[800px]">
                    {/* Exit Label */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center text-white text-sm">
                        EXIT FROM THE STADIUM
                    </div>

                    {/* Stadium SVG */}
                    <div className="flex pl-16">
                        <img src={seats} alt="Stadium Layout" className="w-2xl h-auto" />
                    </div>

                    {/* Entry Label */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white text-sm">
                        ENTRY TO THE STADIUM
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute top-8 right-8 space-y-3 mt-34">
                {sections.map((section) => (
                    <div key={section.id} className="flex items-center justify-end gap-4 text-2xl font-[Kanit-Thin] text-white">
                        <span>{section.id}-{section.range}</span>
                        <div className={`w-6 h-6 ${section.color} rounded`}></div>
                    </div>
                ))}
                <div className="flex items-center justify-end gap-4 text-white">
                    <span className="text-2xl font-[Kanit-Thin]">Foodcourt & Restroom</span>
                    <div className="w-6 h-6 bg-pink-400 rounded"></div>
                </div>
                <div className="flex items-center justify-end gap-4 text-white">
                    <span className="text-2xl font-[Kanit-Thin]">Parking Area</span>
                    <div className="w-6 h-6 bg-orange-500 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default StadiumSeating;