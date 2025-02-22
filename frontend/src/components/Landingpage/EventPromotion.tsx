import { useNavigate } from "react-router-dom";
import camera from '../../assets/camera.png';

const EventPromotion = () => {
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-screen bg-black pt-70">
            {/* Orange banner section */}
            <div className="relative w-full h-64 bg-orange-600">
                {/* Camera illustration */}
                <div className="absolute left-8 bottom-35 transform translate-y-1/4">
                    <img
                        src={camera}
                        alt="Vintage movie camera"
                        className="w-[500px] h-[700px] object-contain grayscale"
                    />
                </div>

                {/* Text content - now left aligned */}
                <div className="absolute right-40 top-1/2 transform -translate-y-1/2 text-left">
                    <h1 className="text-5xl font-[Karantina-Bold] text-black mb-4">
                        MAKE YOUR OWN EVENT
                    </h1>
                    <p className="text-sm text-black/80 font-[Kanit-Thin] mb-4">
                        iohfpw cejkgewolk cvjkeg2io
                        <br />
                        he9de etbwvvcgi2
                    </p>
                    <button className="bg-white text-3xl text-black py-3 px-12 font-[Karantina-Bold] rounded-full hover:bg-gray-100 transition-colors">
                        JOIN NOW
                    </button>
                </div>
            </div>

            {/* Bottom banner with star */}
            <div className="absolute bottom-1 w-full flex justify-center items-center">
                <div className="relative flex flex-col items-center">
                    {/* Yellow banner */}
                    <div className="relative">
                        <svg width="454" height="79" viewBox="0 0 454 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="454" y="78.2842" width="368.902" height="78.2271" rx="39.1135" transform="rotate(180 454 78.2842)" fill="#FFE992"/>
                            <path d="M0 78L113 0V78H0Z" fill="#FFE992"/>
                        </svg>
                        <button 
                            onClick={() => navigate("/form")} 
                            className="absolute inset-0 flex items-center justify-center text-black font-[Karantina-Regular] text-4xl cursor-pointer"
                        >
                            CREATE YOUR EVENT
                        </button>

                    </div>

                    {/* Star */}
                    <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10">
                        <svg
                            width="162"
                            height="160"
                            viewBox="0 0 192 181"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g filter="url(#filter0_i_119_50)">
                                <path
                                    d="M96 0L118.451 69.0983H191.106L132.327 111.803L154.779 180.902L96 138.197L37.2215 180.902L59.6729 111.803L0.894348 69.0983H73.5486L96 0Z"
                                    fill="#1ED760"
                                />
                            </g>
                            <path
                                d="M96 1.61802L117.976 69.2528L118.088 69.5983H118.451H189.567L132.033 111.399L131.739 111.612L131.852 111.958L153.827 179.593L96.2939 137.792L96 137.579L95.7061 137.792L38.1725 179.593L60.1484 111.958L60.2607 111.612L59.9668 111.399L2.43319 69.5983H73.5486H73.9119L74.0241 69.2528L96 1.61802Z"
                                stroke="black"
                            />
                            <defs>
                                <filter
                                    id="filter0_i_119_50"
                                    x="0.894348"
                                    y="0"
                                    width="196.211"
                                    height="186.902"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dx="6" dy="6" />
                                    <feGaussianBlur stdDeviation="25" />
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0" />
                                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_119_50" />
                                </filter>
                            </defs>
                        </svg>
                    </div>

                    {/* Purple banner */}
                    <div className="relative">
                        <svg width="478" height="79" viewBox="0 0 478 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="388.403" height="78.2271" rx="39.1135" transform="matrix(1 0 0 -1 0 78.2842)" fill="#A14BFD"/>
                            <path d="M478 78L359.026 0V78H478Z" fill="#A14BFD"/>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-white font-[Karantina-Regular] text-4xl">
                            Best Platform to get Deals
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPromotion;