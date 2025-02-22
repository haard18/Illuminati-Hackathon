import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';

interface Event {
  description: string;
  venue: string;
  date: string;
  artistWalletAddress: string;
}

interface Ticket {
  type: string;
  quantity: number;
}

interface Booking {
  _id: string;
  coverImage: string;
  event: Event;
  tickets: Ticket[];
  status: string;
}

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("myTickets");
  const [metadataIpfsUrl, setMetadataIpfsUrl] = useState<string>("");
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bookings/getMyBookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const myTickets = bookings.filter((booking) => booking.status === "eligible");
  const appliedEvents = bookings.filter((booking) => booking.status === "queued");

  const createTicket = async (userAddress: string, quantity: number, eventName: string, eventDate: string, eventLocation: string) => {
    try {
      console.log(userAddress, quantity, eventName, eventDate, eventLocation);
      const response = await axios.post("http://localhost:3000/create-ticket", {
        userAddress,
        quantity,
        eventName,
        eventDate,
        eventLocation
      });
      console.log(response.data);
      setMetadataIpfsUrl(response.data.metadataIpfsUrl);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const contractABI = [
    {
      "inputs": [
        { "internalType": "string", "name": "_tokenURI", "type": "string" },
        { "internalType": "address", "name": "_royaltyAddress", "type": "address" },
        { "internalType": "uint256", "name": "price", "type": "uint256" },
        { "internalType": "uint256", "name": "quantity", "type": "uint256" }
      ],
      "name": "mintTicket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  const contractAddress = "0xAbAAc1ac5C6C06d022eE9432c8a5cD68bddeA81A";

  const mintTicketFunction = async (metadataIpfsUrl: string, artistWalletAddress: string, quantity: number, price: number) => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Check if user is on Sepolia network
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111n) { // Sepolia chain ID
        alert("Please switch to Sepolia testnet in MetaMask.");
        return;
      }

      // Load contract with signer
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Convert price to Wei (assuming price is in ETH)
      // const priceInWei = ethers.parseEther(price.toString());

      // Send transaction
      const tx = await contract.mintTicket(metadataIpfsUrl, artistWalletAddress, price, quantity, {
        value: price * quantity // Total price
      });

      await tx.wait(); // Wait for transaction confirmation

      alert("NFT Minted Successfully!");
      setTransactionSuccessful(true);
      navigate('/ticket');
    } catch (error) {
      console.error("Error minting ticket:", error);
      alert("Transaction Failed!");
    }
  };

  const handleViewTicket = () => {
    // Navigate to the ticket view page
    navigate('/ticket'); // Replace with your actual route
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white p-6 font-[Kanit-Regular]">
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-xl transition ${activeTab === "myTickets" ? "bg-purple-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("myTickets")}
          >
            My Tickets
          </button>
          <button
            className={`px-4 py-2 rounded-xl transition ${activeTab === "appliedEvents" ? "bg-purple-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("appliedEvents")}
          >
            Applied Events
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : activeTab === "myTickets" ? (
          <div className="grid grid-cols-3 gap-6">
            {myTickets.length === 0 ? (
              <p>No eligible tickets found.</p>
            ) : (
              myTickets.map((booking) => {
                const userTicket = booking.tickets[0];
                const ticketPrice = booking.event[userTicket.type as keyof typeof booking.event]?.price || "N/A";

                return (
                  <div key={booking._id} className="bg-zinc-900/50 rounded-2xl p-6 flex flex-col items-center">
                    <img src={booking.coverImage} alt={`Cover for ${booking.event.description}`} className="rounded-xl" />
                    <h3 className="text-xl font-semibold text-gray-200 mt-3">{booking.event.description}</h3>
                    <p className="text-sm text-gray-400">{booking.event.venue}</p>
                    <p className="text-sm text-gray-400">{new Date(booking.event.date).toDateString()}</p>
                    <p className="text-sm text-gray-400">{booking.event.artistWalletAddress}</p>
                    <p className="text-md font-bold mt-2">Ticket Type: {userTicket.type}</p>
                    <p className="text-md">Quantity: {userTicket.quantity}</p>
                    <p className="text-md">Price per Ticket: ETH {ticketPrice / 100000}</p>
                    <p className="text-md">Total Price: ETH {(parseFloat(ticketPrice) * userTicket.quantity) / 100000}</p>
                    {transactionSuccessful || metadataIpfsUrl ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                        onClick={handleViewTicket}
                      >
                        View Ticket
                      </button>
                    ) : (
                      <button
                        className="bg-purple-600 text-white px-4 py-2 rounded-md mt-4"
                        onClick={() => createTicket(
                          localStorage.getItem("walletAddress") || "",
                          userTicket.quantity,
                          booking.event.description,
                          booking.event.date,
                          booking.event.venue
                        )}
                      >
                        Mint Ticket
                      </button>

                    )}
                    {metadataIpfsUrl && (
                      <div className="flex gap-4 justify-center mt-4">
                        <a href={metadataIpfsUrl} target="_blank" rel="noopener noreferrer">
                          View Metadata
                        </a>
                        <button
                          className="bg-purple-600 text-white px-4 py-2 rounded-md "
                          disabled={transactionSuccessful}
                          onClick={() => mintTicketFunction(metadataIpfsUrl, booking.event.artistWalletAddress, userTicket.quantity, ticketPrice)}
                        >
                          Mint Ticket
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <p>No queued events found.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
