const express = require("express");
const QRCode = require("qrcode");
const EventRouter = require("./routes/EventRouter");
const BookingRouter = require("./routes/BookingRouter");
const spotifyRouter = require("./routes/Spotify");
const Auth = require("./routes/AuthRouter");
const connectDB = require("./dbconfig");
const { PinataSDK } = require("pinata-web3");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
connectDB();
const pinata = new PinataSDK({
  pinataJwt: process.env.API_JWT,
  pinataGateway: "harlequin-peculiar-lion-672.mypinata.cloud", // Optional: Your Pinata gateway
});

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve the static HTML
app.use(express.static(path.join(__dirname, "public"))); // Assuming your index.html is inside the 'public' folder

/**
 * Generates a QR code as a base64 image and creates a file-like object.
 * @param {string} data - The data to encode in the QR code.
 * @returns {Promise<Buffer>} - A Buffer object representing the QR code image.
 */
async function generateQRCodeAsBlob(data) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(data, { width: 500 }, (err, url) => {
      if (err) return reject(err);

      // Convert the base64 string into a Buffer
      const base64Data = url.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");
      console.log("QR code generated as a Buffer");
      resolve(buffer);
    });
  });
}

/**
 * Uploads a file (QR code or JSON) to IPFS using Pinata Web3 SDK.
 * @param {Buffer} buffer - The file buffer to be uploaded.
 * @param {string} fileName - The name of the file to be uploaded.
 * @returns {Promise<string>} - The IPFS CID of the uploaded file.
 */
async function uploadFileToIPFS(buffer, fileName, fileType) {
  try {
    console.log(`Uploading ${fileName} to Pinata...`);
    const file = new File([buffer], fileName, { type: fileType });
    const result = await pinata.upload.file(file);

    // Log the entire result to debug
    console.log("Upload result:", result);

    // Return the IPFS CID
    return result.IpfsHash;
  } catch (error) {
    console.error(`Error uploading ${fileName} to Pinata:`, error);
    throw error;
  }
}
/**
 * Route for creating a ticket and metadata.
 */
app.post("/create-ticket", async (req, res) => {
  const { eventId, ticketId, userAddress } = req.body;
  //call the concert database
  // coldplayConcert = { date,time,location,seatingtickets=300, standingtickets=200, vip=100, vvip=50}
  // concert.standingtickets==0;
  // return res.status(400).json({ error: "No standing tickets available" });
  // 
  // 
  // 
  // 
  try {
    if (!eventId || !ticketId || !userAddress) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare QR code data
    const qrData = `eventId:${eventId}-ticketId:${ticketId}-user:${userAddress}`;
    const qrFileName = `ticket-${ticketId}.png`;

    // Generate QR code as Buffer
    const qrBuffer = await generateQRCodeAsBlob(qrData);

    // Upload QR code to IPFS
    const qrIpfsCid = await uploadFileToIPFS(qrBuffer, qrFileName, "image/png");

    console.log("QR Code uploaded to IPFS:", qrIpfsCid);

    // Prepare metadata JSON
    const metadata = {
      name: `Event Ticket #${ticketId}`,
      description: `This is a ticket for Event ID: ${eventId}`,
      image: `ipfs://${qrIpfsCid}`,
      attributes: [
        { trait_type: "Event ID", value: eventId },
        { trait_type: "Ticket ID", value: ticketId },
        { trait_type: "User Address", value: userAddress },
      ],
    };

    const metadataBuffer = Buffer.from(JSON.stringify(metadata));
    const metadataFileName = `ticket-${ticketId}.json`;

    // Upload metadata JSON to IPFS
    const metadataIpfsCid = await uploadFileToIPFS(
      metadataBuffer,
      metadataFileName,
      "application/json"
    );

    console.log("Metadata uploaded to IPFS:", metadataIpfsCid);

    // Respond with the IPFS URL of the metadata
    res.status(200).json({
      success: true,
      qrIpfsUrl: `ipfs://${qrIpfsCid}`,
      metadataIpfsUrl: `ipfs://${metadataIpfsCid}`,
    });
  } catch (error) {
    console.error("Error generating ticket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Handle home route (for serving the frontend).
 */
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Ticketing API" });
});

app.use("/events", EventRouter);
app.use("/bookings", BookingRouter);
app.use("/auth", Auth);
app.use("/api/spotify", spotifyRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
