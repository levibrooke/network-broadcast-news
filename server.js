const net = require(`net`);

// create a new server
const server = net.createServer((socket) => {

  // client is listening for connection
  console.log(`client connected`);

  socket.write(`Hello, socket client!`);
  socket.pipe(socket);

  socket.on(`data`, (data) => {
    socket.write(`socket data`);
  })

  socket.on(`end`, () => {
    console.log(`client disconnected`);
  });
});

server.on(`error`, (err) => {
  throw err;
});

server.listen(6969, `0.0.0.0`, () => {
  console.log(`server listening on port 6969`);
});

// broadcast
