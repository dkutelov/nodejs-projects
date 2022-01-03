const http = require("http");

const friends = [
  {
    id: 1,
    name: "Joe"
  },
  {
    id: 2,
    name: "John"
  },
  {
    id: 3,
    name: "Dora"
  }
];

// req is readable stream
// res is a writable stream
const server = http.createServer((req, res) => {
  const items = req.url.split("/");
  // /friends/2 -> ["", "friends", "2"]
  if (req.method === "GET" && items[1] === "friends") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    // signals end of writable strem to send

    if (items.length === 3) {
      // index out of range?
      const friendId = +items[2];
      const friend = friends.find((x) => x.id === friendId);
      res.end(JSON.stringify(friend));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      // byte buffer -> string -> JS object
      const friend = data.toString();
      console.log(friend);
      friends.push(JSON.parse(friend));
    });

    // mirror req data in the response -> pipe the req stream to res stream
    req.pipe(res); //no res.end() when use pipe
  } else if (req.method === "GET" && items[1] === "messages") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hi, there</h1>");
    res.write("<h2>Hello</h2>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

//listen to request; needs a port
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server started on port: ${PORT}.`);
}); //127.0.0.1
