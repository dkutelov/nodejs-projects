const Block = require("./block");
const Blockchain = require("./blockchain");

describe("Blockchain", () => {
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
  });

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

  describe("isValidChain()", () => {
    describe("when the chain does not start with the genesis blcok", () => {
      it("returns false", () => {
        blockchain.chain[0] = { data: "fake-genesis" };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain does start with the genesis block and has multiple blocks", () => {
      beforeEach(() => {
        blockchain.addBlock({ data: "Bears" });
        blockchain.addBlock({ data: "Wolfs" });
        blockchain.addBlock({ data: "Bees" });
      });
      describe("and lastHash has changed", () => {
        it("returns false", () => {
          blockchain.chain[2].lastHash = "broken last hash";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe("and the chain contains a block with an invalid field", () => {
        it("returns false", () => {
          blockchain.chain[2].data = "bad data";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe("and the chain does not contain any invalid blocks", () => {
        it("returns true", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
});
