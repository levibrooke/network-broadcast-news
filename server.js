const net = require(`net`);

let connections = [];

// create a new server
const server = net.createServer();

server.on(`connection`, (socket) => {
  console.log(`Connection established`);

  socket.setEncoding(`utf8`);
  process.stdin.pipe(socket); // pipe from server to client
  socket.user = null; // create user property on socket obj
  connections.push(socket); // add new connections to array
  console.log(connections);


  socket.write(`Please enter a username:`);

  socket.on(`data`, (data) => {

    // if no username yet set it
    if (socket.user === null) {
      socket.user = data.trim();
      console.log(connections);
    }
    else { // if username is not null
      let username = socket.user;

      console.log(`Received ${username}: ${data}`);

      connections
        .filter(element => { // filter out client that sent msg
          return element !== socket;
        })
        .forEach(element => { // write the message to other connected clients
          element.write(`${username}: ${data}`);
        });
    }
  });

  socket.on(`end`, () => {
    connections.splice(connections.indexOf(socket, 1));
    // console.log(connections);
    console.log(`Client disconnected`);
  });
});

server.listen(6969, `0.0.0.0`, () => {
  console.log(`Server listening on port 6969`);
});


// 1. client connects to server
// 2. server asks client to enter username
// 3. server stores username
// 4. prepend all messages from the user w/ username



