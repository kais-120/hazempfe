const express = require("express");
const router = express.Router();
const authRouter = require("./router/authRouter");

router.use("/auth",authRouter)

module.exports = router;