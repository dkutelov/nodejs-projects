const http = require('http');
const io = require('socket.io');

const apiServer = require('./api');
//const server = require('http').createServer(api);

// https://socket.io/docs/v4/handling-cors/
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     method: ['GET', 'POST'],
//   },
// });

const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer);

const sockets = require('./sockets');
const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT} ...`);
});

sockets.listen(socketServer);
