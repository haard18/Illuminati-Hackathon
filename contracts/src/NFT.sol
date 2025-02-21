// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    uint256 public constant ROYALTY_PERCENTAGE = 10; // 10% royalty

    // Custom error definitions
    error InvalidPayment(uint256 expected, uint256 actual);
    error InvalidRoyaltyRecipient(address recipient);

    event TicketMinted(
        address indexed minter,
        uint256 tokenId,
        address royaltyRecipient,
        uint256 royaltyAmount
    );

    constructor() ERC721("EventTicket", "TKT") Ownable(msg.sender) {}

    function mintTicket(
        string memory tokenURI,
        address royaltyRecipient,
        uint256 price,
        uint256 quantity
    ) external payable {
        uint256 totalPrice = price * quantity;

        // Use custom error for payment validation
        if (msg.value != totalPrice) {
            revert InvalidPayment(totalPrice, msg.value);
        }

        // Use custom error for royalty recipient validation
        if (royaltyRecipient == address(0)) {
            revert InvalidRoyaltyRecipient(royaltyRecipient);
        }

        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        uint256 royaltyAmount = (totalPrice * ROYALTY_PERCENTAGE) / 100;

        // Send royalty to artist
        payable(royaltyRecipient).transfer(royaltyAmount);
        // Rest stays in the contract (owner can withdraw)

        nextTokenId++;

        emit TicketMinted(msg.sender, tokenId, royaltyRecipient, royaltyAmount);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
