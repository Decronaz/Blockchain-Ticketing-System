// server.js
import express from "express";
import cors from "cors";
import QRCode from "qrcode";
import TicketBlockchain from "./blockchain.js";

const app = express();
const ticketChain = new TicketBlockchain();

// Add detailed CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create new tickets and mine a block
app.post("/api/create-tickets", async (req, res) => {
  try {
    const { tickets } = req.body;
    const ticketData = [];

    // Create tickets and add to pending
    for (const ticket of tickets) {
      const newTicket = ticketChain.createNewTicket(
        ticket.fullname,
        ticket.email,
        ticket.phone,
        ticket.section,
        ticket.price,
      );
      ticketChain.addTicketToPending(newTicket);
      ticketData.push(newTicket);
    }

    // Mine new block with tickets
    const previousBlock = ticketChain.getLastBlock();
    const previousBlockHash = previousBlock["hash"];
    const currentBlockData = {
      tickets: ticketChain.pendingTickets,
      index: previousBlock["index"] + 1,
    };
    const nonce = ticketChain.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = ticketChain.hashBlock(
      previousBlockHash,
      currentBlockData,
      nonce,
    );
    const newBlock = ticketChain.createNewBlock(
      nonce,
      previousBlockHash,
      blockHash,
    );

    // Generate QR codes for each ticket
    const qrCodes = await Promise.all(
      ticketData.map(async (ticket) => {
        const qrData = JSON.stringify({
          ticketId: ticket.ticketId,
          fullname: ticket.fullname,
          section: ticket.section,
          blockHash: blockHash,
        });
        const qrCode = await QRCode.toDataURL(qrData);
        return {
          ticketId: ticket.ticketId,
          qrCode: qrCode,
        };
      }),
    );

    res.json({
      success: true,
      message: "Tickets created successfully",
      tickets: ticketData,
      qrCodes: qrCodes,
      block: newBlock,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating tickets",
      error: error.message,
    });
  }
});

// Verify ticket
app.post("/api/verify-ticket", (req, res) => {
  const { ticketId, blockHash } = req.body;
  const ticketData = ticketChain.getTicketData(ticketId);

  if (!ticketData) {
    return res.json({
      valid: false,
      message: "Ticket not found",
    });
  }

  // Find the block containing this ticket
  const block = ticketChain.chain.find((block) =>
    block.tickets.some((ticket) => ticket.ticketId === ticketId),
  );

  if (block.hash !== blockHash) {
    return res.json({
      valid: false,
      message: "Invalid ticket hash",
    });
  }

  res.json({
    valid: true,
    message: "Valid ticket",
    ticketData,
  });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Server error",
    error: err.message,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
