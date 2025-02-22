import { useEffect, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import r1 from "./assets/rolling1.jpeg";
import r2 from "./assets/rolling2.jpeg";
import r3 from "./assets/rolling3.jpeg";
import r4 from "./assets/rolling4.jpeg";
import r5 from "./assets/rolling5.jpeg";
import InfiniteScroll from "./components/Landingpage/InfiniteCarousel"

interface RollingGalleryProps {
  autoplay?: boolean;
  images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({ autoplay = false, images = [] }) => {
  const defaultImages: string[] = [r1, r2, r3, r4, r5, r1, r2, r3, r4, r5];
  const galleryImages = images.length > 0 ? images : defaultImages;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1200 : 3000;
  const faceCount = galleryImages.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.3;
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const transform = useTransform(rotation, (val) => `rotate3d(0,1,0,${val}deg)`);

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay, controls, rotation]);

  const handleUpdate = (latest: { rotateY?: number }) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: { velocity: { x: number } }) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  return (
    <>
    <div className="relative h-[800px] w-full overflow-hidden bg-black mb-20">
      <div>
        <h1 className="text-center mt-8 text-4xl font-['Karantina-Regular'] text-white">EXPLORE, BOOK, EXPERIENCE</h1>
        <h2 className="text-center text-7xl font-['Karantina-Regular'] text-white">DISCOVER OUR RECENT EVENTS</h2>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40" />
      {/* <div className="absolute left-1/2 top-[87%] z-20 -translate-x-1/2 -translate-y-1/2">
        <button className="rounded-full bg-purple-600 px-8 py-3 text-3xl font-['Karantina-Bold'] text-white shadow-lg transition-transform hover:scale-105">
          View More
        </button>
      </div> */}

      <div className="flex h-full items-center justify-center [perspective:1200px] -mt-44">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform as any,
            rotateY: rotation as any,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center"
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[2%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <div className="overflow-hidden rounded-3xl border-2 border-white/10 shadow-xl">
                <img
                  src={url}
                  alt={`gallery item ${i + 1}`}
                  className="h-[220px] w-[230px] object-cover transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    <div className="-mt-56 mb-5">
    <InfiniteScroll />
    </div>
    </>
  );
};

export default RollingGallery;