const net = require(`net`);

let connections = [];

// create a new server
const server = net.createServer();

server.on(`connection`, (socket) => {
  console.log(`Connection established`);

  socket.setEncoding(`utf8`);

  connections.push(socket); // add new connections to array

  socket.on(`data`, (data) => {
    console.log(`Received: ${data}`);

    connections
      .filter(element => { // filter out client that sent msg
        return element !== socket;
      })
      .forEach(element => { // write the message to other connected clients
        element.write(data);
      });
  });

  socket.on(`end`, () => {
    connections.splice(connections.indexOf(socket, 1));
    console.log(connections);
    console.log(`Client disconnected`);
  });
});

server.listen(6969, `0.0.0.0`, () => {
  console.log(`Server listening on port 6969`);
});

