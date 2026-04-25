const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const { createPresence, verifyPresence, getPresence } = require("../controller/presenceController");
const router = express.Router();

router.post("/",AuthenticationToken,createPresence)
router.get("/verify/:id",AuthenticationToken,verifyPresence)
router.get("/:id",AuthenticationToken,getPresence)

module.exports = router