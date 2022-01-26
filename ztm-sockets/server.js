const server = require('http').createServer();

// https://socket.io/docs/v4/handling-cors/
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

let readyPlayerCount = 0;

// Every time client connects
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('ready', () => {
    console.log('Player ready with id: ', socket.id);
    readyPlayerCount++;

    if (readyPlayerCount === 2) {
      //broadcast start game event
      io.emit('startGame', socket.id); //second player becomes refferee
    }
  });

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData);
  });
});
