import pkg from "js-sha3";
const { keccak256 } = pkg;
import crypto from "crypto";

class TicketBlockchain {
  constructor() {
    this.chain = [];
    this.pendingTickets = [];
    this.allTickets = new Map();
    this.createNewBlock(100, "0", "0");
  }

  generateTicketId(fullname, email, section, timestamp) {
    const randomBytes = crypto.randomBytes(32).toString("hex");
    const uniqueString = `${fullname}-${email}-${section}-${timestamp}-${randomBytes}`;

    const hash = keccak256(uniqueString);

    return hash;
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

  createNewTicket(fullname, email, phone, section) {
    const timestamp = Date.now();
    const ticketId = this.generateTicketId(fullname, email, section, timestamp);

    const newTicket = {
      ticketId,
      fullname,
      email,
      phone,
      section,
      purchaseDate: timestamp,
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
