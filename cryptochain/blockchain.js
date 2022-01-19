const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }
  get lastBlockIndex() {
    return this.chain.length - 1;
  }

  addBlock({ data }) {
    const lastBlock = this.chain[this.lastBlockIndex];
    const newBlock = Block.mineBlock({ lastBlock, data });
    this.chain.push(newBlock);
  }
}

module.exports = Blockchain;
