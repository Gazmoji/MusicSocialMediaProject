const express = require("express");
const registerLoginController = require("../controllers/register-loginController");
const router = express.Router();

router.get("/register", registerLoginController.register);

module.exports = router;
