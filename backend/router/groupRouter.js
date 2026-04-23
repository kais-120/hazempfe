const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const { addGroup, getGroups, addJoueurGroupManual, addJoueurGroupAuto, listJoueursGroup, EditJoueurGroup } = require("../controller/groupController");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const router = express.Router();

router.get("",[AuthenticationToken,AuthenticationAdmin],getGroups);
router.post("/add",[AuthenticationToken,AuthenticationAdmin],addGroup);
router.post("/:id/add/manual",[AuthenticationToken,AuthenticationAdmin],addJoueurGroupManual);
router.post("/:id/add-joueurs-auto",[AuthenticationToken,AuthenticationAdmin],addJoueurGroupAuto);
router.get("/:id/list",[AuthenticationToken,AuthenticationAdmin],listJoueursGroup);
router.put("/edit/joueur",[AuthenticationToken,AuthenticationAdmin],EditJoueurGroup);

module.exports = router