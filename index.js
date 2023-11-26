const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, { connectionStateRecovery: {} });

app.get("/", (req, res) => {
  //   res.send("<h1>Hello world</h1>");
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("user connected", (msg) => console.log(msg, "connected"));
  socket.on("chat message", (msg) => {
    // const message = `${msg["sender"]}: ${msg["message"]}`;
    const message = msg;
    io.emit("chat message", message);
    console.log(message);
  });
  socket.on("disconnect", () => {
    // socket.on("user disconnected", (msg) => console.log(msg, "disconnected"));
    console.log("a user disconnected");
  });
});

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
