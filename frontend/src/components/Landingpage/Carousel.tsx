import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import coldplay from "../../assets/Images/coldplay.png";
import singer from "../../assets/Images/singer.png";

const images = [coldplay, singer, coldplay, singer, coldplay, singer];

const LinearCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex + 1;
        if (newIndex >= images.length) newIndex = 0;
        return newIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = (direction: number) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <div className="flex justify-center items-center h-full gap-2">
      {images.map((image, index) => {
        const isCenter = index === currentIndex;
        const isLeft =
          (currentIndex === 0 && index === images.length - 1) ||
          (currentIndex === images.length - 1 && index === 0) ||
          index === currentIndex - 1;
        const isRight =
          (currentIndex === 0 && index === 1) ||
          (currentIndex === images.length - 1 && index === images.length - 2) ||
          index === (currentIndex + 1) % images.length;

        if (isCenter || isLeft || isRight) {
          return (
            <motion.div
              key={index}
              className="mx-1"
              animate={isCenter ? { scale: 1.2, y: -20 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.img
                src={image}
                alt={`Image ${index}`}
                className="cursor-pointer"
                style={{
                  height: "340px", // Default height
                  width: "auto",
                }}
                onClick={() => handleClick(isLeft ? 1 : -1)}
              />
            </motion.div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default LinearCarousel;
