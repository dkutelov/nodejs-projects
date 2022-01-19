class Block {
  constructor({ timestamp, lastHas, hash, data }) {
    this.timestamp = timestamp;
    this.lastHas = lastHas;
    this.hash = hash;
    this.data = data;
  }
}

const block1 = new Block({
  timestamp: "01/01/01",
  lastHas: "foo-lasthash",
  hash: "foo-hash",
  data: "foo-data"
});
console.log(block1);
