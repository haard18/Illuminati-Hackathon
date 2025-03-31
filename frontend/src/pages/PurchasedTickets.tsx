import  { useEffect, useState } from "react";
import axios from "axios";

interface NFT {
  identifier: string;
  image_url: string;
  name: string;
  opensea_url: string;
}

const PurchasedTickets = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const walletAddress = localStorage.getItem("walletAddress");
  const openseaUrl = `https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${walletAddress}/nfts`;

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get(openseaUrl);
        setNfts(response.data.nfts);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    if (walletAddress) {
      fetchNFTs();
    }
  }, [walletAddress]);

  return (
    <div className="w-full px-6 py-6 flex flex-col items- ">
      <h1 className="text-3xl font-bold text-center font-['Karantina-bold'] mb-6 text-white-800">MY PURCHASED TICKETS</h1>

      {nfts.length === 0 ? (
        <p className="text-center text-gray-600">No tickets found in your wallet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {nfts.map((nft) => (
            <div className="w-full flex justify-center items-center">
              <a
                key={nft.identifier}
                href={nft.opensea_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition  bg-white w-full"
              >
                <div className="w-full flex justify-center items-center">
                  <img src={nft.image_url} alt={nft.name} width={200} height={'auto'} className="object-cover rounded-md mb-4" />
                </div>
                <h2 className="text-lg font-semibold text-center text-gray-800">
                  {nft.name.length > 20 ? `${nft.name.slice(0, 20)}...` : nft.name}
                </h2>
                <p className="text-sm text-gray-500 text-center mt-2">View on OpenSea</p>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedTickets;
