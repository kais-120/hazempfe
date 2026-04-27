const { body, validationResult } = require("express-validator");
const { User } = require("../model");
const Payment = require("../model/Payment");
const PricingCategories = require("../model/PricingCategories");

exports.createCategory = [
body("libelle").notEmpty().withMessage("libelle is required"),
body("min_age").notEmpty().withMessage("min age is required"),
body("max_age").notEmpty().withMessage("max age is required"),
body("price").notEmpty().withMessage("price is required")
    ,async (req,res) => {
        const errors = validationResult(req);
                if(!errors.isEmpty()){
                    return res.status(422).json({ errors: errors.array().map(err => err.msg) });
                }
        try{
            const {libelle,min_age,max_age,price} = req.body;
            const category = await PricingCategories.findOne({where: {libelle}});
            if(category){
                return res.status(422).json({ message: "libelle is used" });
            }
            await PricingCategories.create({libelle,min_age,max_age,price})
                return res.json({ message: "pricing is created" });
        }catch(err){
            console.log(err)
                return res.status(500).json({ message: "error server" });
        } 
}
]

exports.getCategory = async (req,res) => {
    try{
        const categories = await PricingCategories.findAll();
        if(categories.length === 0){
            return res.status(404).json({message:"categories not found"})
        }
        return res.json({message:"list categories",categories})
    }catch{
        return res.json({message:"server error"})
    }
}
