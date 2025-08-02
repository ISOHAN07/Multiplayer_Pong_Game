const api = require('./api')
const server = require("http").createServer(api);
const socket = require('./sockets')

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;
server.listen(PORT);
console.log("listening on port 3000...");

socket.listen(io);

