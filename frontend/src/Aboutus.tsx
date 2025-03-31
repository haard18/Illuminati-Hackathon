
import Abouttag1 from "../src/assets/Images/Aboutus/Abouttag1.png"
import Abouttag2 from "../src/assets/Images/Aboutus/Abouttag2.png"
import Aboutrect1 from "../src/assets/Images/Aboutus/Aboutrect1.png"
import Aboutrect2 from "../src/assets/Images/Aboutus/Aboutrect2.png"
import Aboutrect3 from "../src/assets/Images/Aboutus/Aboutrect3.png"

const Aboutus = () => {
    return (
        <>
            <div className='flex bg-black w-full justify-center gap-10'>
                <div className='flex flex-col gap-10 w-1/2'>
                    <div>
                        <h1 className="text-white text-4xl font-[Karantina-Light]">
                            ConcertPass is your ultimate concert ticketing assistant, leveraging secure blockchain technology for bookings. We provide exclusive fan loyalty benefits, a virtual queueing system to ensure fair ticket distribution, and instant digital ticket delivery. With ConcertPass, you can enjoy a seamless and hassle-free concert experience, from securing your tickets to enjoying the show.
                        </h1>
                    </div>

                    <div className="tags">
                        <img src={Abouttag1} alt="" className='w-[50%] h-[30%]' />
                        <img src={Abouttag2} alt="" className='w-[50%] h-[30%]' />

                    </div>
                </div>
                <div>
                    <div className="img flex flex-row gap-3">
                        <div className="rect w-[60%] h-[70%]  flex-col flex justify-end">
                            <img src={Aboutrect1} alt="" />
                            <h1 className='text-white font-[Karantina-bold]  text-7xl ' ><span className='text-[#FF4A2B]'>About</span> <br />Us</h1>
                        </div>


                        <img src={Aboutrect2} alt="" className='w-[60%] h-[70%]' />
                        <img src={Aboutrect3} alt="" className='w-[60%] h-[70%]' />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Aboutus
