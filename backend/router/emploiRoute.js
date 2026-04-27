const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { addEmploi, getJoueurEmploi, getChildEmploi, getEntraineurEmploi, getEmploiById, uodateEmploi } = require("../controller/emploiController");
const router = express.Router();

router.get("/add/:id",[AuthenticationToken,AuthenticationAdmin],addEmploi)
router.get("/get/:id",[AuthenticationToken,AuthenticationAdmin],getEmploiById)
router.post("/add/:id",[AuthenticationToken,AuthenticationAdmin],addEmploi)
router.put("/:id",[AuthenticationToken,AuthenticationAdmin],uodateEmploi)
router.get("/joueur",[AuthenticationToken],getJoueurEmploi)
router.get("/entraineur",[AuthenticationToken],getEntraineurEmploi)
router.get("/parent/:id",[AuthenticationToken],getChildEmploi)

module.exports = router;