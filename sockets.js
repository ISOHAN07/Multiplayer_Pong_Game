let readyPlayers = 0;

function listen(io) {
  const pongNamespace = io.of("/pong"); // this namespace helps us in making different io channels on the same server
  let room;
  
  pongNamespace.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayers / 2); // naming of the room
      socket.join(room); // this is the joining of the room

      console.log("The player is ready...", socket.id);

      readyPlayers++;

      if (readyPlayers % 2 === 0) {
        pongNamespace.in(room).emit("startGame", socket.id); // only emits it to the pong channel's room
        // this socket.id is of the refree of the game that tracks the game details
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
      socket.leave(room);
      // socket can restablish connection unless it is io server disconnected issue
    });
  });
}

module.exports = {
  listen,
};
