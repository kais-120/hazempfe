const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { createTest, getTestEntraineur, updateTestJoueur, getTesting, listJoueur, parentTesting, joueurTesting } = require("../controller/testingController");
const router = express.Router();

router.post("",[AuthenticationToken,AuthenticationAdmin],createTest);
router.get("",[AuthenticationToken,AuthenticationAdmin],getTesting);
router.get("/entraineur",[AuthenticationToken],getTestEntraineur);
router.put("/update-status",[AuthenticationToken],updateTestJoueur);
router.post("/entraineur/list/joueur",[AuthenticationToken],listJoueur);
router.get("/joueur",[AuthenticationToken],joueurTesting);
router.get("/parent/:id",[AuthenticationToken],parentTesting);



module.exports = router