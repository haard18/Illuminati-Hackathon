import Navbar from "../components/Navbar";

import Hero from "../components/Landingpage/Hero";
import Landing2 from "../components/Landing2";
import Events from "../components/Event";

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
        <Events />
      </div>
    </>
  );
};

export default Home;
