const express = require("express");
const { createPayment } = require("../controller/paymentController");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const router = express.Router();

router.post("",AuthenticationToken,createPayment)
router.get("/date/verify",AuthenticationToken,createPayment)

module.exports = router;