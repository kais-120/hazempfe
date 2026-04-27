const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { createCategory } = require("../controller/pricingCategoriesController");
const router = express.Router();

router.post("",[AuthenticationToken,AuthenticationAdmin],createCategory)

module.exports = router;