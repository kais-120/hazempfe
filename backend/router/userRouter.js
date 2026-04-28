const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { addUser, getUsers, getJoueurByAge, getChild, addChild } = require("../controller/userController");
const router = express.Router();

router.post("/add",[AuthenticationToken,AuthenticationAdmin],addUser);
router.get("/:role",[AuthenticationToken,AuthenticationAdmin],getUsers);
router.get("/get/joueur/age/:id",[AuthenticationToken,AuthenticationAdmin],getJoueurByAge);
router.post("/parent/add/child",[AuthenticationToken],addChild);
router.get("/parent/get/child",[AuthenticationToken],getChild);


module.exports = router