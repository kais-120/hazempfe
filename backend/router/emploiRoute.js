const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { addEmploi, getJoueurEmploi } = require("../controller/emploiController");
const router = express.Router();

router.get("/add/:id",[AuthenticationToken,AuthenticationAdmin],addEmploi)
router.post("/add/:id",[AuthenticationToken,AuthenticationAdmin],addEmploi)
router.get("/joueur",[AuthenticationToken],getJoueurEmploi)
router.get("/entraineur",[AuthenticationToken],getJoueurEmploi)

module.exports = router;