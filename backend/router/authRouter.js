const express = require("express");
const { register, login, profile } = require("../controller/authController");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/profile",AuthenticationToken,profile);

module.exports = router