import React from "react";
import { motion } from "framer-motion";
import vector from "../../assets/Images/Vector.png"; // Import the asterisk image

// List of concerts (Uppercase)
const concerts = [
  "COLDPLAY LIVE - LONDON",
  "THE WEEKND - AFTER HOURS TOUR",
  "TAYLOR SWIFT - ERAS TOUR",
  "ARCTIC MONKEYS - GLASTONBURY",
  "BILLIE EILISH - HAPPIER THAN EVER TOUR",
  "IMAGINE DRAGONS - MERCURY TOUR",
  "DUA LIPA - FUTURE NOSTALGIA TOUR",
  "ED SHEERAN - MATHEMATICS TOUR",
];

const InfiniteScrollStrip = () => {
  return (
    <div className="relative w-full bg-black overflow-hidden py-4">
      <motion.div
        className="flex whitespace-nowrap items-center gap-8 text-4xl font-semibold"
        style={{ fontFamily: "Karantina-bold" }}
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 20, // Slow speed
          ease: "linear",
        }}
      >
        {/* Duplicate concert names for seamless looping */}
        {[...concerts, ...concerts].map((concert, index) => (
          <React.Fragment key={index}>
            <span className="text-[#FF4A2B]">{concert.toUpperCase()}</span>
            {/* Asterisk Image Separator - Bigger Size */}
            <img src={vector} className="h-8 w-8 object-contain" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScrollStrip;
