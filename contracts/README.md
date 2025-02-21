

---

## **🎟️ TicketNFT Smart Contract - Foundry Cast Commands**

This document provides **Foundry `cast` commands** to interact with the **TicketNFT** contract.

---

### **🔧 Setup**
Before running commands, set up your environment variables:

```sh
export RPC_URL="<YOUR_RPC_URL>"
export PRIVATE_KEY="<YOUR_PRIVATE_KEY>"
export NFT_CONTRACT="<DEPLOYED_TICKETNFT_CONTRACT_ADDRESS>"
```

---

## **1️⃣ Mint a Ticket**
To mint an event ticket, the user must send the mint price along with the transaction.

```sh
cast send $NFT_CONTRACT --private-key $PRIVATE_KEY \
  --value 50000000000000000 \
  "mintTicket(string,address)" "<TOKEN_URI>" <ROYALTY_RECIPIENT_ADDRESS>
```

- `<TOKEN_URI>` → The metadata URI of the NFT.
- `<ROYALTY_RECIPIENT_ADDRESS>` → Address of the artist or royalty receiver.

✅ **Mints an NFT, transfers it to the caller, and sends 10% of the mint price to the royalty recipient.**

---

## **2️⃣ Get Token URI**
Fetch the metadata URI of a given token.

```sh
cast call $NFT_CONTRACT "tokenURI(uint256)" <TOKEN_ID>
```

✅ **Returns** the URI pointing to the NFT metadata.

---

## **3️⃣ Check NFT Ownership**
To check the owner of a specific NFT:

```sh
cast call $NFT_CONTRACT "ownerOf(uint256)" <TOKEN_ID>
```

✅ **Returns** the address of the NFT owner.

---

## **4️⃣ Approve Another Contract to Manage NFTs**
To allow another contract (like **TicketResale**) to handle a specific NFT:

```sh
cast send $NFT_CONTRACT --private-key $PRIVATE_KEY \
  "approve(address,uint256)" <SPENDER_ADDRESS> <TOKEN_ID>
```

✅ **Grants permission to the marketplace contract to resell the NFT.**

---

## **5️⃣ Withdraw Contract Balance (Owner Only)**
The contract owner can withdraw all ETH stored in the contract.

```sh
cast send $NFT_CONTRACT --private-key $PRIVATE_KEY "withdraw()"
```

✅ **Transfers the entire contract balance to the owner's wallet.**

---

### **📌 Notes**
- Prices must be in **Wei** (1 ETH = `1e18` Wei).
- Ensure your **PRIVATE_KEY** has enough ETH for gas fees.
- Use `--rpc-url $RPC_URL` if the environment variable isn't set.

---
## MarketPlace
### **Ticket Resale Contract - Foundry Cast Commands**


### **🔧 Setup**
Before running commands, set up your environment variables:

```sh
export RPC_URL="<YOUR_RPC_URL>"
export PRIVATE_KEY="<YOUR_PRIVATE_KEY>"
export RESALE_CONTRACT="<DEPLOYED_CONTRACT_ADDRESS>"
export NFT_CONTRACT="<TICKET_NFT_CONTRACT_ADDRESS>"
```

---

## **1️⃣ Approve Marketplace to Transfer NFTs**
Before listing, the user must approve the marketplace contract to handle their NFT.

```sh
cast send $NFT_CONTRACT --private-key $PRIVATE_KEY "approve(address,uint256)" $RESALE_CONTRACT <TOKEN_ID>
```

✅ **This allows the resale contract to transfer the specified NFT.**

---

## **2️⃣ List a Ticket for Resale**
Once approved, the user can list the ticket on the marketplace.

```sh
cast send $RESALE_CONTRACT --private-key $PRIVATE_KEY \
  "listTicket(uint256,uint256,uint256,address)" \
  <TOKEN_ID> <EVENT_TIMESTAMP> <ORIGINAL_PRICE_IN_WEI> <ARTIST_ADDRESS>
```

- `<TOKEN_ID>` → The NFT’s ID.
- `<EVENT_TIMESTAMP>` → Unix timestamp of the event.
- `<ORIGINAL_PRICE_IN_WEI>` → Original ticket price (in Wei).
- `<ARTIST_ADDRESS>` → Address of the artist for royalty distribution.

✅ **This transfers the NFT to the marketplace and lists it for resale.**

---

## **3️⃣ Buy a Ticket**
A buyer can purchase a ticket by sending the correct price.

```sh
cast send $RESALE_CONTRACT --private-key $PRIVATE_KEY \
  --value <LISTING_PRICE_IN_WEI> \
  "buyTicket(uint256)" <TOKEN_ID>
```

✅ **This transfers the NFT to the buyer and distributes funds to the seller and artist.**

---

## **4️⃣ Get Ticket Listing Details**
To check if a ticket is listed and fetch its details:

```sh
cast call $RESALE_CONTRACT "getListing(uint256)" <TOKEN_ID>
```

✅ **Returns** seller address, listing price, event timestamp, and artist address.

---

## **5️⃣ Get All Active Listings**
Fetch all active ticket listings:

```sh
cast call $RESALE_CONTRACT "getAllListings()"
```

✅ **Returns** an array of token IDs, seller addresses, and listing prices.

---

### **📌 Notes**
- Prices must be in **Wei** (1 ETH = `1e18` Wei).
- Ensure your **PRIVATE_KEY** has enough ETH for gas fees.
- Use `--rpc-url $RPC_URL` if the environment variable isn't set.

---
