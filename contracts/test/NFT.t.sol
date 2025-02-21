// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {TicketNFT} from "../src/NFT.sol"; // Adjust path if needed

contract TicketNFTTest is Test {
    TicketNFT public ticketNFT;

    address owner = address(0x123);
    address user = address(0x456);
    address artist = address(0x789);
    uint256 mintPrice = 0.05 ether;
    string tokenURI = "ipfs://sample-metadata";

    function setUp() public {
        vm.startPrank(owner); // Simulate contract deployment by owner
        ticketNFT = new TicketNFT();
        vm.stopPrank();
    }

    function testMintTicket() public {
        vm.deal(user, 1 ether); // Give test user some ETH

        vm.startPrank(user);
        ticketNFT.mintTicket{value: mintPrice}(tokenURI, artist, mintPrice);
        emit log_string("Ticket minted successfully");
        vm.stopPrank();

        assertEq(ticketNFT.ownerOf(0), user);
    }

    function testRoyaltyPaid() public {
        vm.deal(user, 1 ether);
        uint256 artistBalanceBefore = artist.balance;
        uint256 royaltyAmount = (mintPrice * 10) / 100;

        vm.startPrank(user);
        ticketNFT.mintTicket{value: mintPrice}(tokenURI, artist, mintPrice);
        emit log_string("Royalty paid to artist");
        vm.stopPrank();

        assertEq(artist.balance, artistBalanceBefore + royaltyAmount);
    }

    function testCannotMintWithWrongPrice() public {
        vm.deal(user, 1 ether);

        vm.startPrank(user);
        vm.expectRevert(TicketNFT.InvalidPrice.selector);
        ticketNFT.mintTicket{value: 0.01 ether}(tokenURI, artist, mintPrice); // Wrong price
        vm.stopPrank();
    }

    function testCannotMintWithInvalidRoyaltyRecipient() public {
        vm.deal(user, 1 ether);

        vm.startPrank(user);
        vm.expectRevert(TicketNFT.InvalidRoyaltyRecipient.selector);
        ticketNFT.mintTicket{value: mintPrice}(tokenURI, address(0), mintPrice); // Invalid artist address
        vm.stopPrank();
    }

    function testOwnerCanWithdraw() public {
        vm.deal(user, 1 ether);

        vm.startPrank(user);
        ticketNFT.mintTicket{value: mintPrice}(tokenURI, artist, mintPrice);
        vm.stopPrank();

        uint256 contractBalance = address(ticketNFT).balance;
        uint256 ownerBalanceBefore = owner.balance;

        vm.startPrank(owner);
        ticketNFT.withdraw();
        emit log_string("Owner withdrew funds");
        vm.stopPrank();

        assertEq(owner.balance, ownerBalanceBefore + contractBalance);
    }
}
