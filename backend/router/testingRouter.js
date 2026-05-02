const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { createTest, getTestEntraineur, updateTestJoueur, getTesting, listJoueur } = require("../controller/testingController");
const router = express.Router();

router.post("",[AuthenticationToken,AuthenticationAdmin],createTest);
router.get("",[AuthenticationToken,AuthenticationAdmin],getTesting);
router.get("/entraineur",[AuthenticationToken],getTestEntraineur);
router.put("/update-status",[AuthenticationToken],updateTestJoueur);
router.post("/entraineur/list/joueur",[AuthenticationToken],listJoueur);



module.exports = router