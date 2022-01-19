const Block = require("./block");
const cryptoHash = require("./crypto-hash");

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

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let index = 1; index < chain.length; index++) {
      const { timestamp, lastHash, hash, data } = chain[index];
      const actualLastHash = chain[index - 1].hash;

      if (lastHash !== actualLastHash) {
        return false;
      }

      const validatedHash = cryptoHash(timestamp, lastHash, data);

      if (validatedHash !== hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;
