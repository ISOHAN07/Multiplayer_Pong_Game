const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;
server.listen(PORT);
console.log("listening on port 3000...");

let readyPlayers = 0;

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("ready", () => {
    console.log("The player is ready...", socket.id);

    readyPlayers++;

    if(readyPlayers === 2){
      io.emit("startGame", socket.id)
      // this socket.id is of the refree of the game that tracks the game details
    }
  });

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData);
  })
});
