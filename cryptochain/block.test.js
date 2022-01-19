const Block = require("./block");

describe("Block", () => {
  const timestamp = "a date";
  const lastHash = "foo-hash";
  const hash = "bar-hash";
  const data = ["blockchain", "data"];
  const block = new Block({ timestamp, lastHash, hash, data });

  it("has timestamp, lastHash, hash, data properties", () => {
    expect(block.timestamp).toEqual(timestamp); //actual to equal expected
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });
});
