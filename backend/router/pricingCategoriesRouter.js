const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { createCategory, getCategory } = require("../controller/pricingCategoriesController");
const router = express.Router();

router.post("",[AuthenticationToken,AuthenticationAdmin],createCategory)
router.get("",[AuthenticationToken,AuthenticationAdmin],getCategory)

module.exports = router;