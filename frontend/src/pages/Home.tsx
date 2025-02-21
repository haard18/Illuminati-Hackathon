import Navbar from "../components/Navbar";

import Hero from "../components/Landingpage/Hero";
import Landing2 from "../components/Landing2";
import RollingGallery from "../RollingGallery";
import EventCarousel from "../components/EventCarousel";
// import Events from "../components/Event";

const Home = () => {
  return (
    <>
      <div className="bg-black ">
        <Navbar />
      </div>
      <div className="">
        <Hero />
      </div>
      <div className="bg-black h-[800px] pt-20 mt-[-18%]">
        <Landing2 />
        {/* <Events /> */}
        <EventCarousel/>
        <RollingGallery/>
      </div>
    </>
  );
};

export default Home;
