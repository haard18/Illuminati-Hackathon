const Navbar = () => {
  return (
    <nav
      className="bg-black shadow-md py-3 px-10 flex justify-between items-center tracking-wider text-4xl"
      style={{ fontFamily: "Karantina-regular" }}
    >
      {/* Brand Name */}
      <div className="text-xl font-bold text-white">Brand</div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 gap-10 items-center">
        <li>
          <a href="#" className="text-white hover:text-[#FF895E]">Home</a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-[#FF895E]">Events</a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-[#FF895E]">Calendar</a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-[#FF895E]">Profile</a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-[#FF895E]">About Us</a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-[#FF895E]">Register</a>
        </li>

        {/* Connect Wallet Button */}
        <li>
          <button className="bg-[#FF4A2B] text-white px-6 py-2 rounded-full transition duration-300 hover:bg-[#7a52cc]">
            Connect Wallet
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
