import Navbar from "../components/Navbar";
import Hero from "../components/Landingpage/Hero";
import Landing2 from "../components/Landing2";
import RollingGallery from "../RollingGallery";
import EventCarousel from "../components/EventCarousel";
// import Events from "../components/Event";
import Aboutus from "../Aboutus";
import EventPromotion from "../components/Landingpage/EventPromotion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [counter,setcounter]=useState(0);
  // useEffect(() => {
  //   const token = localStorage.getItem("spotify_access_token");
  //   const hasNavigated = localStorage.getItem("hasNavigated");

  //   if (token && counter === 0 && !hasNavigated) {
  //     navigate("/auth");
  //     localStorage.setItem("hasNavigated", "true");
  //     setcounter(counter + 1);
  //   }
  // }, [navigate, counter]);
  return (
    <>
      <div className="bg-black">
        <Navbar />
      </div>
      <div>
        <Hero />
      </div>
      <div className="bg-black pt-20 mt-[-18%]">
        <Landing2 />
        <EventCarousel/>
        <RollingGallery autoplay={true}/>
        <Aboutus />
        <EventPromotion/>
        <Footer/>
      </div>
    </>
  );
};

export default Home;
