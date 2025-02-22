import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const connectWallet = async (): Promise<void> => {
    // @ts-expect-error: window.ethereum is not defined
    if (window.ethereum) {
      try {
        // @ts-ignore
        const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });

        const address: string = accounts[0];
        setWalletAddress(address);
        localStorage.setItem("walletAddress", address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };


  return (
    <nav
      className="bg-black shadow-md py-3 z-20 px-10 flex justify-between items-center tracking-wider text-4xl"
      style={{ fontFamily: "Karantina-regular" }}
    >
      {/* Brand Name */}
      <Link to="/" className="text-xl font-bold text-white">
        Brand
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-6 gap-10 items-center">
        <li>
          <Link to="/" className="text-white hover:text-[#FF895E]">
            Home
          </Link>
        </li>
        <li>
          <Link to="/allevent" className="text-white hover:text-[#FF895E]">
            Events
          </Link>
        </li>
        <li>
          <Link to="/" className="text-white hover:text-[#FF895E]">
            Calendar
          </Link>
        </li>
        <li>
          <Link to="/profile" className="text-white hover:text-[#FF895E]">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/" className="text-white hover:text-[#FF895E]">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/auth" className="text-white hover:text-[#FF895E]">
            Register
          </Link>
        </li>

        {/* Connect Wallet Button */}
        <li>
          <button onClick={connectWallet} className="bg-[#FF4A2B] text-white px-6 py-2 rounded-full transition duration-300 hover:bg-[#7a52cc]">
            {walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "Connect Wallet"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
