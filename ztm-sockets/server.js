const server = require('http').createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    method: ['GET', 'POST'],
  },
});
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT} ...`);
});

// Every time client connects
io.on('connection', (socket) => {
  console.log('a user connected');
});
