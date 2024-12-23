import pkg from "js-sha3";
const { keccak256 } = pkg;
import { v1 as uuidv1 } from "uuid";

class TicketBlockchain {
  constructor() {
    this.chain = [];
    this.pendingTickets = [];
    this.allTickets = new Map(); // Store all tickets for persistence
    this.createNewBlock(100, "0", "0");
  }

  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      tickets: this.pendingTickets,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash,
    };

    // Store tickets in allTickets map before clearing pendingTickets
    this.pendingTickets.forEach((ticket) => {
      this.allTickets.set(ticket.ticketId, {
        ticket,
        blockHash: hash,
        timestamp: newBlock.timestamp,
      });
    });

    this.pendingTickets = [];
    this.chain.push(newBlock);
    return newBlock;
  }

  createNewTicket(fullname, email, phone, section, price) {
    const ticketId = uuidv1().split("-").join(""); // Generate unique ID
    const newTicket = {
      ticketId,
      fullname,
      email,
      phone,
      section,
      price,
      purchaseDate: Date.now(),
    };
    return newTicket;
  }

  getTicketData(ticketId) {
    const ticketInfo = this.allTickets.get(ticketId);
    if (!ticketInfo) return null;

    return {
      ...ticketInfo.ticket,
      blockHash: ticketInfo.blockHash,
      timestamp: ticketInfo.timestamp,
    };
  }

  getAllTickets() {
    return Array.from(this.allTickets.values()).map((info) => ({
      ...info.ticket,
      blockHash: info.blockHash,
      timestamp: info.timestamp,
    }));
  }

  // Rest of the methods remain the same
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTicketToPending(ticketObj) {
    this.pendingTickets.push(ticketObj);
    return this.getLastBlock()["index"] + 1;
  }

  hashBlock(previousBlockHash, currentBlockData, nonce) {
    const dataAsString =
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = keccak256(dataAsString);
    return hash;
  }

  proofOfWork(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== "0000") {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
  }
}

export default TicketBlockchain;
