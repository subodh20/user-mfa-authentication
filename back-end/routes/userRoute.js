const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const { verifyAuthToken } = require("../utils/auth-middleware");
router.get("/getAllUsers", verifyAuthToken, userController.getUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
module.exports = router;
