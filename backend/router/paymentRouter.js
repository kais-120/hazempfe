const express = require("express");
const { createPayment, paymentHistory, getPlayersPaymentStatus, paymentVerify, paymentParent } = require("../controller/paymentController");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const router = express.Router();

router.post("",AuthenticationToken,createPayment)
router.get("/verify",AuthenticationToken,paymentVerify)
router.get("/history",AuthenticationToken,paymentHistory)
router.get("/players-status",[AuthenticationToken,AuthenticationAdmin],getPlayersPaymentStatus)
router.get("/parent",AuthenticationToken,paymentParent)

module.exports = router;