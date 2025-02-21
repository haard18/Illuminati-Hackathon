import React from 'react'
import Abouttag1 from "../src/assets/Images/Aboutus/Abouttag1.png"
import Abouttag2 from "../src/assets/Images/Aboutus/Abouttag2.png"
import Aboutrect1 from "../src/assets/Images/Aboutus/Aboutrect1.png"
import Aboutrect2 from "../src/assets/Images/Aboutus/Aboutrect2.png"
import Aboutrect3 from "../src/assets/Images/Aboutus/Aboutrect3.png"

const Aboutus = () => {
    return (
        <>
            <div className='flex   bg-black gap-10 '>
                <div className='flex flex-col gap-10'>
                    <div >
                        <h1 className='text-white '>Explore now & get amazing deals<br/>
                            on your bookings!<br/> jkdgfo823hblfbvuqgbe;kcngqe cljb<br/>
                            bquietfol wejlkhcpikleq2<br/> bvjlcgweuohn;lfi10kmcnqhcilnqfiohlkw cuiwgqiofln.<br/>
                            uoqwyerpiqbwguof djlchask cuogqiolk cvyiqgifklnq.</h1>
                    </div>
                    <div className="tags">
                        <img src={Abouttag1} alt="" />
                        <img src={Abouttag2} alt="" />
                        
                    </div>
                </div>
                <div>
                    <div className="img flex flex-row gap-3">
                    <div className="rect w-1/2 h-1/2  flex-col flex justify-end">
                        <img src={Aboutrect1} alt="" />
                        <h1 className='text-white font-[Karantina-bold]  text-7xl ' ><span className='text-[#FF4A2B]'>About</span> <br/>Us</h1>
                    </div>
                    
                   
                    <img src={Aboutrect2} alt="" className='w-1/2 h-1/2' />
                    <img src={Aboutrect3} alt="" className='w-1/2 h-1/2' />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Aboutus
