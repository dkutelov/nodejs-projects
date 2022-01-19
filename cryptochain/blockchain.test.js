const Block = require("./block");
const Blockchain = require("./blockchain");

describe("Blockchain", () => {
  const blockchain = new Blockchain();

  it("contains a `chain` Array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("adds new block to the chain", () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });
    const lastIndex = blockchain.chain.length - 1;
    expect(blockchain.chain[lastIndex].data).toEqual(newData);
  });
});
