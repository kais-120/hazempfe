const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { addUser, getUsers, getJoueurByAge } = require("../controller/userController");
const router = express.Router();

router.post("/add",[AuthenticationToken,AuthenticationAdmin],addUser);
router.get("/:role",[AuthenticationToken,AuthenticationAdmin],getUsers);
router.get("/get/joueur/age/:type",[AuthenticationToken,AuthenticationAdmin],getJoueurByAge);


module.exports = router