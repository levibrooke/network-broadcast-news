const net = require(`net`);

// create a new socket connection
const client = net.connect(6969, `0.0.0.0`, () => {
  console.log(`client connected`);

  // write to server
  process.stdin.pipe(client);

  // alternate method to print rcvd msg to console
  // client.pipe(process.stdout);
});

client.on(`data`, (data) => {
  console.log(`${data}`);
})

client.on(`close`, () => {
  console.log(`Connection closed`);
});