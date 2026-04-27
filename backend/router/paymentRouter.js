const express = require("express");
const { createPayment, DatePaymentVerify, paymentHistory, getPlayersPaymentStatus } = require("../controller/paymentController");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const router = express.Router();

router.post("",AuthenticationToken,createPayment)
router.get("/date/verify",AuthenticationToken,DatePaymentVerify)
router.get("/history",AuthenticationToken,paymentHistory)
router.get("/players-status",[AuthenticationToken,AuthenticationAdmin],getPlayersPaymentStatus)

module.exports = router;