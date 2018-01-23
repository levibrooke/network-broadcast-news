const net = require(`net`);

// create a new socket connection
const client = new net.Socket();

client.connect(6969, `0.0.0.0`, () => {
  console.log(`client connected`);

  // write to server
  client.write(`Hello, server!`);
  client.pipe(client);
});

client.on(`data`, (data) => {
  console.log(`Received ${data}`);
  // client.destroy();
})

client.on(`close`, () => {
  console.log(`Connection closed`);
});