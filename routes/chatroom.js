const express = require("express");
const chatroomController = require("../controllers/chatroomController");
const router = express.Router();

router.get("/chatroom", chatroomController.chatroom);

module.exports = router;
