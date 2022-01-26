let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of('/pong');

  // Every time client connects
  pongNamespace.on('connection', (socket) => {
    let room = 'room' + Math.floor(readyPlayerCount / 2);
    console.log('a user connected', socket.id, 'room ', room);

    socket.on('ready', () => {
      // First two join room 0, secoond 2 join room 1

      socket.join(room);
      console.log('Player ready with id: ', socket.id);
      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        //broadcast start game event to all in the room
        pongNamespace.in(room).emit('startGame', socket.id); //second player becomes refferee
      }
    });

    socket.on('paddleMove', (paddleData) => {
      // to all except who sent the data
      socket.to(room).emit('paddleMove', paddleData);
    });

    socket.on('ballMove', (ballData) => {
      // to all except who sent the data in a room
      socket.to(room).emit('ballMove', ballData);
    });

    socket.on('disconnect', (reason) => {
      console.log('Server disconnected: ', reason);
      socket.leave(room);
    });
  });
}

module.exports = { listen };
