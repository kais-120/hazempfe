const { body, validationResult } = require("express-validator");
const { User } = require("../model");
const Payment = require("../model/Payment");
const PricingCategories = require("../model/PricingCategories");

exports.createCategory = [
body("libelle").notEmpty().withMessage("libelle is required"),
body("min_age").notEmpty().withMessage("min age is required"),
body("mix_age").notEmpty().withMessage("mix age is required"),
body("price").notEmpty().withMessage("price is required")
    ,async (req,res) => {
        const errors = validationResult(req);
                if(!errors.isEmpty()){
                    return res.status(422).json({ errors: errors.array().map(err => err.msg) });
                }
        try{
            const {libelle,minAge,mixAge,price} = req.body;
            const category = await PricingCategories.findOne({where: {libelle}});
            if(category){
                return res.status(422).json({ message: "libelle is used" });
            }
            await PricingCategories.create({libelle,min_age,mix_age,price})
                return res.json({ message: "pricing is created" });
        }catch{
                return res.status(500).json({ message: "error server" });
        } 
}
]
