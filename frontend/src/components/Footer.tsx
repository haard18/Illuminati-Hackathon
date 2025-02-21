import React from 'react';
import bg from "../assets/Images/Rectangle 67.png";

const Footer: React.FC = () => {
    return (
        <footer
            className="bg-cover bg-center text-white p-8"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Contact Us Section */}
                    <div>
                        <h3 className="text-4xl font-[Karantina-Bold] mb-4">CONTACT US</h3>
                        <p>+91-9262996771</p>
                        <p>example@gmail.com</p>
                        <p>jshpfnsi@violapfuswmla</p>
                        <p>jshpfnsi@viola</p>
                    </div>

                    {/* Get Help Section */}
                    <div>
                        <h3 className="text-4xl font-[Karantina-Bold] mb-4">GET HELP</h3>
                        <p>+91-9262996771</p>
                        <p>example@gmail.com</p>
                        <p>jshpfnsi@violapfuswmla</p>
                        <p>jshpfnsi@viola</p>
                    </div>

                    {/* About Section */}
                    <div>
                        <h3 className="text-4xl font-[Karantina-Bold] mb-4">ABOUT</h3>
                        <p >+91-9262996771</p>
                        <p>example@gmail.com</p>
                        <p>jshpfnsi@violapfuswmla</p>
                        <p>jshpfnsi@viola</p>
                    </div>

                    {/* Newsletter Section */}
                    <div className="flex flex-col text-center items-center">
                        <h3 className="text-3xl font-[Karantina-Bold] mb-5">
                            SUBSCRIBE TO OUR NEWSLETTER NOW
                        </h3>
                        <input
                            type="email"
                            placeholder="Enter email address"
                            className="p-2 w-68 text-white mb-2 border border-white"
                        />
                        <button className="bg-[#FF4A2B] text-white p-2 w-68">
                            SUBSCRIBE NOW
                        </button>
                    </div>

                </div>



                {/* Copyright Section */}
                <div className="mt-8 text-center">
                    <p>©2025 copyright</p>
                    <p>qwudol.whlcjk3rhfu3h4ff0924hl4ffnio3bf</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;