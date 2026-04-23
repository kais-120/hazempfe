const express = require("express");
const router = express.Router();
const authRouter = require("./router/authRouter");
const groupRoute = require("./router/groupRouter");
const userRoute = require("./router/userRouter");
const emploiRoute = require("./router/emploiRoute");

router.use("/auth",authRouter)
router.use("/group",groupRoute)
router.use("/user",userRoute)
router.use("/emploi",emploiRoute)

module.exports = router;