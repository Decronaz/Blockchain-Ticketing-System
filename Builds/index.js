import express from "express";
import cors from "cors";
import QRCode from "qrcode";
import TicketBlockchain from "./blockchain.js";

const app = express();
const ticketChain = new TicketBlockchain();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.post("/api/create-tickets", async (req, res) => {
  try {
    const { tickets } = req.body;
    const ticketData = [];

    for (const ticket of tickets) {
      const newTicket = ticketChain.createNewTicket(
        ticket.fullname,
        ticket.email,
        ticket.phone,
        ticket.section,
      );
      ticketChain.addTicketToPending(newTicket);
      ticketData.push(newTicket);
    }

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

    const qrCodes = await Promise.all(
      ticketData.map(async (ticket) => {
        const qrData = JSON.stringify({
          ticketId: ticket.ticketId,
          fullname: ticket.fullname,
          email: ticket.email,
          phone: ticket.phone,
          section: ticket.section,
          blockHash: blockHash,
          timestamp: newBlock.timestamp,
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

app.post("/api/verify-ticket", (req, res) => {
  const { ticketId, blockHash } = req.body;
  const ticketData = ticketChain.getTicketData(ticketId);

  if (!ticketData) {
    return res.json({
      valid: false,
      message: "Ticket not found",
    });
  }

  if (ticketData.blockHash !== blockHash) {
    return res.json({
      valid: false,
      message: "Invalid ticket hash",
    });
  }

  res.json({
    valid: true,
    message: "Valid ticket",
    ticketData: {
      name: ticketData.fullname,
      email: ticketData.email,
      phonenumber: ticketData.phone,
      section: ticketData.section,
      timestamp: new Date(ticketData.timestamp).toISOString(),
    },
  });
});

app.get("/api/tickets", (req, res) => {
  const allTickets = ticketChain.getAllTickets();
  res.json({
    success: true,
    tickets: allTickets,
  });
});

app.use((err, _req, res, _next) => {
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

module.exports = app;