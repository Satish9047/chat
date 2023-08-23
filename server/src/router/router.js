const express = require("express");
const router = express.Router();
const {loginController, registerController, verifyChatController} = require("../controllers/authController");
const {usersListController} = require("../controllers/userListController");

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/verifyChat", verifyChatController);
router.get("/userslist", usersListController);

module.exports = router;