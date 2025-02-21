// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketResale is ReentrancyGuard, Ownable {
    constructor(address _ticketNFT) Ownable(msg.sender) {
        ticketNFT = IERC721(_ticketNFT);
    }

    struct Listing {
        address seller;
        uint256 price;
        uint256 originalPrice;
        uint256 eventTimestamp;
        address artist;
    }

    IERC721 public ticketNFT;
    uint256 public constant ROYALTY_PERCENTAGE = 10; // 10% royalty
    mapping(uint256 => Listing) public listings;
    uint256[] public activeListings; // Store token IDs for easier access

    event TicketListed(uint256 tokenId, address seller, uint256 price);
    event TicketSold(uint256 tokenId, address buyer, uint256 price);

    function listTicket(
        uint256 tokenId,
        uint256 eventTimestamp,
        uint256 originalPrice,
        address artist
    ) external {
        require(ticketNFT.ownerOf(tokenId) == msg.sender, "Not ticket owner");
        require(eventTimestamp > block.timestamp, "Event already passed");

        uint256 daysLeft = (eventTimestamp - block.timestamp) / 1 days;
        uint256 maxResalePrice = originalPrice + ((originalPrice * daysLeft) / 100);

        listings[tokenId] = Listing({
            seller: msg.sender,
            price: maxResalePrice,
            originalPrice: originalPrice,
            eventTimestamp: eventTimestamp,
            artist: artist
        });

        activeListings.push(tokenId);
        ticketNFT.transferFrom(msg.sender, address(this), tokenId);
        emit TicketListed(tokenId, msg.sender, maxResalePrice);
    }

    function buyTicket(uint256 tokenId) external payable nonReentrant {
        Listing memory listing = listings[tokenId];
        require(listing.seller != address(0), "Listing not found");
        require(msg.value == listing.price, "Incorrect price");

        uint256 royaltyAmount = (listing.price * ROYALTY_PERCENTAGE) / 100;
        payable(listing.artist).transfer(royaltyAmount);
        payable(listing.seller).transfer(listing.price - royaltyAmount);

        ticketNFT.transferFrom(address(this), msg.sender, tokenId);
        delete listings[tokenId];

        // Remove tokenId from activeListings
        for (uint256 i = 0; i < activeListings.length; i++) {
            if (activeListings[i] == tokenId) {
                activeListings[i] = activeListings[activeListings.length - 1];
                activeListings.pop();
                break;
            }
        }

        emit TicketSold(tokenId, msg.sender, listing.price);
    }

    /// @notice Fetch details of a specific listing
    function getListing(uint256 tokenId)
        external
        view
        returns (address seller, uint256 price, uint256 eventTimestamp, address artist)
    {
        Listing memory listing = listings[tokenId];
        require(listing.seller != address(0), "Listing not found");
        return (listing.seller, listing.price, listing.eventTimestamp, listing.artist);
    }

    /// @notice Fetch all active listings
    function getAllListings() external view returns (uint256[] memory, address[] memory, uint256[] memory) {
        uint256 length = activeListings.length;
        uint256[] memory tokenIds = new uint256[](length);
        address[] memory sellers = new address[](length);
        uint256[] memory prices = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            uint256 tokenId = activeListings[i];
            tokenIds[i] = tokenId;
            sellers[i] = listings[tokenId].seller;
            prices[i] = listings[tokenId].price;
        }
        return (tokenIds, sellers, prices);
    }
}
