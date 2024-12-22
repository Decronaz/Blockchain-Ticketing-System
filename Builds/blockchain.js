//blockchain.js
import pkg from "js-sha3";
const { keccak256 } = pkg;
import { v1 as uuidv1 } from "uuid";

class TicketBlockchain {
  constructor() {
    this.chain = [];
    this.pendingTickets = [];
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
    this.pendingTickets = [];
    this.chain.push(newBlock);
    return newBlock;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createNewTicket(fullname, email, phone, section, price) {
    const newTicket = {
      fullname,
      email,
      phone,
      section,
      price,
      ticketId: uuidv1().split("-").join(""),
      purchaseDate: Date.now(),
    };
    return newTicket;
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

  getTicketData(ticketId) {
    let ticketData = null;
    this.chain.forEach((block) => {
      block.tickets.forEach((ticket) => {
        if (ticket.ticketId === ticketId) {
          ticketData = ticket;
        }
      });
    });
    return ticketData;
  }
}

export default TicketBlockchain;
