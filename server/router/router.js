const express = require("express");
const router = express.Router();
const {loginController, registerController} = require("../controllers/authController");
const {chatController} = require("../controllers/chatController");


router.post("/login", loginController);
router.post("/register", registerController)
router.post("/chat", chatController)
module.exports = router;