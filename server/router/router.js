const express = require("express");
const router = express.Router();
const {loginController, registerController, verifyChatController} = require("../controllers/authController");

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/verifyChat", verifyChatController);

module.exports = router;