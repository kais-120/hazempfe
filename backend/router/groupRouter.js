const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const { addGroup, getGroups, addJoueurGroupManual, addJoueurGroupAuto, listJoueursGroup, EditJoueurGroup, entraineurListJoueursGroup, entraineurListGroup } = require("../controller/groupController");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const router = express.Router();

router.get("",[AuthenticationToken,AuthenticationAdmin],getGroups);
router.post("/add",[AuthenticationToken,AuthenticationAdmin],addGroup);
router.post("/:id/add/manual",[AuthenticationToken,AuthenticationAdmin],addJoueurGroupManual);
router.post("/:id/add-joueurs-auto",[AuthenticationToken,AuthenticationAdmin],addJoueurGroupAuto);
router.get("/:id/list",[AuthenticationToken,AuthenticationAdmin],listJoueursGroup);
router.get("/get/entraineur/list",AuthenticationToken,entraineurListGroup);
router.get("/get/entraineur/:id/list",AuthenticationToken,entraineurListJoueursGroup);
router.put("/edit/joueur",[AuthenticationToken,AuthenticationAdmin],EditJoueurGroup);
router.get("/get/entraineur/groups",[AuthenticationToken],EditJoueurGroup);

module.exports = router