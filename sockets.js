let readyPlayers = 0;

function listen(io) {
  const pongNamespace = io.of('/pong')
  pongNamespace.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("ready", () => {
      console.log("The player is ready...", socket.id);

      readyPlayers++;

      if (readyPlayers % 2 === 0) {
        pongNamespace.emit("startGame", socket.id);
        // this socket.id is of the refree of the game that tracks the game details
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
      // socket can restablish connection unless it is io server disconnected issue
    });
  });
}

module.exports = {
    listen,
}
