const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const routes = require("./routes");
const mongoose = require("mongoose");
const chatroomController = require("../controllers/chatroomController");
const router = express.Router();

module.exports = router;
