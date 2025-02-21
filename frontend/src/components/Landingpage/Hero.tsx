import LinearCarousel from "./Carousel";
import InfiniteScrollStrip from "./InfiniteCarousel";
import offers from "../../assets/Images/offers.png"

const Hero = () => {
  return (
    <div
      className="bg-black relative h-[800px] w-full flex flex-col bg-hero tracking-widest"
      style={{ fontFamily: "Karantina-regular" }}
    >
      <div className="flex w-full  h-full flex-col gap-[10%] ">
        {/* Text Content */}
        <div className="w-1/2 flex flex-col  text-white z-10 mt-[8%] px-2">
          <p
            className="p-0 m-0 font-bold "
            style={{ fontFamily: "Karantina-bold", fontSize: "120px" }}
          >
            FAITH <span className="text-[#FF4A2B]">IN</span> FUTURE
          </p>
          <p className="text-xl mt-[-5%]">
            Louis Tomlinson was announced as part of the lineup <br /> for
            Lollapalooza India 2025.
          </p>

          <div className="flex gap-5 mt-5">
            <img src={offers} alt="Offers" className="mt-[-15%] ml-[10%]" />
          </div>


        </div>

        {/* Carousel */}
        <div className="mt-[-30%] flex  justify-end items-end">
          <LinearCarousel />
        </div>
        <div className="mt-[-6%] flex  justify-end items-end">
        <InfiniteScrollStrip />
        </div>
      
      
      </div>
      
    </div>
  );
};

export default Hero;
