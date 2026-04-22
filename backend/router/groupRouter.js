const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const { addGroup, getGroups } = require("../controller/groupController");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const router = express.Router();

router.get("",[AuthenticationToken,AuthenticationAdmin],getGroups);
router.post("/add",[AuthenticationToken,AuthenticationAdmin],addGroup);

module.exports = router