const express = require("express");
const AuthenticationToken = require("../middleware/AuthenticationToken");
const AuthenticationAdmin = require("../middleware/AuthenticationAdmin");
const { getProduct, getPublicProduct, getProductById, createProduct, updateProduct, deleteProduct } = require("../controller/productController");
const upload = require("../middleware/Uploads");
const router = express.Router();

router.get("",[AuthenticationToken,AuthenticationAdmin],getProduct)
router.get("/public",getProduct)
router.get("/product/:id",[AuthenticationToken,AuthenticationAdmin],getProductById)
router.post("",[AuthenticationToken,AuthenticationAdmin,upload.single("image")],createProduct)
router.put("/:id",[AuthenticationToken,AuthenticationAdmin],updateProduct)
router.delete(":id",[AuthenticationToken,AuthenticationAdmin],deleteProduct)


module.exports = router