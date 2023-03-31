const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const registerLoginRoutes = require("./routes/register-login");
const chatroomRoutes = require("./routes/chatroom");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

app.use("/", registerLoginRoutes);

app.use("/", chatroomRoutes);

app.use(express.static("js"));

app.use(express.static("css"));

app.engine("mustache", mustacheExpress());

app.set("views", "./views");

app.set("view engine", "mustache");

app.use(express.urlencoded());

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "/chatroom.html"));
});

let chatroomMessages = [];

io.on("connection", (socket) => {
  console.log("You have connected...");
  io.emit("General-Joined", chatroomMessages);

  socket.on("General", (chat) => {
    chatroomMessages.push(chat);
    io.emit("General", chat);
  });
});

http.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
