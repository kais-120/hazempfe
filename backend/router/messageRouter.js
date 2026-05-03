const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const { createMessage, createMessageAdmin, getUserMessage, getListMessage, getMessageById } = require("../controller/messageController");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const router = express.Router();

router.post("/user",[AuthenticationToken],createMessage);
router.post("/admin",[AuthenticationToken],createMessageAdmin);

router.get("/user",[AuthenticationToken],getUserMessage);
router.get("/list",[AuthenticationToken,AuthenticationAdmin],getListMessage);
router.get("/:id",[AuthenticationToken,AuthenticationAdmin],getMessageById);

module.exports = router