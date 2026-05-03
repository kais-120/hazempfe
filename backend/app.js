const express = require("express");
const router = express.Router();
const authRouter = require("./router/authRouter");
const groupRoute = require("./router/groupRouter");
const userRoute = require("./router/userRouter");
const emploiRoute = require("./router/emploiRoute");
const absencesRoute = require("./router/presenceRoute");
const paymentRouter = require("./router/paymentRouter");
const pricingCategoriesRouter = require("./router/pricingCategoriesRouter");
const testingRouter  = require("./router/testingRouter");
const productRouter  = require("./router/productRouter");
const messageRouter  = require("./router/messageRouter");

router.use("/auth",authRouter)
router.use("/group",groupRoute)
router.use("/user",userRoute)
router.use("/emploi",emploiRoute)
router.use("/presence",absencesRoute)
router.use("/payment",paymentRouter)
router.use("/pricing",pricingCategoriesRouter)
router.use("/testing",testingRouter)
router.use("/product",productRouter)
router.use("/message",messageRouter)

module.exports = router;