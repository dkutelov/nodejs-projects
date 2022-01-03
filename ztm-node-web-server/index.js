const http = require("http");

// req is readable stream
// res is a writable stream
const server = http.createServer((req, res) => {
  if (req.url === "/friends") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    // signals end of writable strem to send
    res.end(
      JSON.stringify({
        id: 1,
        name: "Joe"
      })
    );
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hi, there</h1>");
    res.write("<h2>Hello</h2>");
    res.end();
  }
});

//listen to request; needs a port
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server started on port: ${PORT}.`);
}); //127.0.0.1
