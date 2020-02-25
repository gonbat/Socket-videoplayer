const path = require("path");
const express = require("express");
const app = express();
const SocketIO = require("socket.io");

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

const server = app.listen(app.get("port"), () => {
  console.log("Sintonizados al", app.get("port"));
});

const io = SocketIO.listen(server);

io.on("connection", socket => {
  console.log("Connected");
  socket.on("update", data => {
    console.log(data);
    socket.broadcast.emit("update", data);
  });
  socket.on("play", () => {
    socket.broadcast.emit("play");
  });
  socket.on("pause", () => {
    socket.broadcast.emit("pause");
  });
  socket.on("slider", data => {
    socket.broadcast.emit("slider", data);
  });
});
