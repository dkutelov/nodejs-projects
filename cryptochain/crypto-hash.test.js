const cryptoHash = require("./crypto-hash");

describe("cryptoHash()", () => {
  it("generates a SHA-256 hashed output", () => {
    expect(cryptoHash("fooBar")).toEqual(
      "5a906c247218ea5ab49428b2c46c1e36fc71a44a90b2fe136b7599749594ef23"
    );
  });

  it("produces the same hash with the same input arguments in any order", () => {
    expect(cryptoHash("one", "two", "three")).toEqual(
      cryptoHash("three", "two", "one")
    );
  });
});
