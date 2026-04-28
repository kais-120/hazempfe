const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { createTest, getTestEntraineur, updateTestJoueur, getTesting } = require("../controller/testingController");
const router = express.Router();

router.post("",[AuthenticationToken,AuthenticationAdmin],createTest);
router.get("",[AuthenticationToken,AuthenticationAdmin],getTesting);
router.get("/entraineur",[AuthenticationToken],getTestEntraineur);
router.put("/entraineur/:id",[AuthenticationToken],updateTestJoueur);



module.exports = router