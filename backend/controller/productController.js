const { body, validationResult } = require("express-validator");
const Product = require("../model/Product");

exports.getProduct = async (req,res) => {
    try{
        const products = await Product.findAll();
        if(products.length === 0){
            return res.status(404).json({message:"products is empty"});
        }
        return res.json({message:"list products",products});
    }catch{
        return res.status(500).json({message:"error server"});
    }
}
exports.getProductById = async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        return res.json({message:"product",product});
    }catch{
        return res.status(500).json({message:"error server"});
    }
}
exports.createProduct = [
    body("titre").notEmpty().withMessage("titre is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("price").notEmpty().withMessage("price is required"),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
    try{
        const {titre,description,price,discount} = req.body
        await Product.create({titre,description,price,discount})
        return res.json({message:"product is created"});
    }catch{
        return res.status(500).json({message:"error server"});
    }
}
]

exports.updateProduct = [
    body("titre").notEmpty().withMessage("titre is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("price").notEmpty().withMessage("price is required"),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
    try{
        const {id} = req.params;
        const {titre,description,price,discount} = req.body
        const [updated] = await Product.update(
            { titre, description, price, discount },
            { where: { id } }
            );

            if (updated === 0) {
            return res.status(404).json({ message: "Product not found" });
            }
        return res.json({message:"Product updated successfully"});
    }catch{
        return res.status(500).json({message:"error server"});
    }
}
]
exports.deleteProduct = async (req,res) => {
    try{
        const {id} = req.params
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        product.destroy();
        return res.json({message:"product deleted"});
    }catch{
        return res.status(500).json({message:"error server"});
    }
}
