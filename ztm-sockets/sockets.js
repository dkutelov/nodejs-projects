let readyPlayerCount = 0;

function listen(io) {
  // Every time client connects
  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('ready', () => {
      console.log('Player ready with id: ', socket.id);
      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        //broadcast start game event
        io.emit('startGame', socket.id); //second player becomes refferee
      }
    });

    socket.on('paddleMove', (paddleData) => {
      // to all except who sent the data
      socket.broadcast.emit('paddleMove', paddleData);
    });

    socket.on('ballMove', (ballData) => {
      // to all except who sent the data
      socket.broadcast.emit('ballMove', ballData);
    });

    socket.on('disconnect', (reason) => {
      console.log('Server disconnected: ', reason);
    });
  });
}

module.exports = { listen };
