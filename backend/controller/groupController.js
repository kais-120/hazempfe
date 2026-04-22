const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { Groupe } = require("../model");

exports.addGroup = [
    body("libelle").notEmpty().withMessage("libelle is required"),
    body("entraineur_id").notEmpty().withMessage("entraineur id is required"),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
        try{
        const {libelle,entraineur_id} = req.body;
        const existliblle = await Groupe.findOne({ where: { libelle } });
            if (existliblle) {
            res.status(422).json({message:"libelle is already used"});
            }
        await Groupe.create({libelle,entraineur_id})
        return res.status(201).json({message:"group created"});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"});
    }
}
]
exports.getGroups = async (req,res) => {
        try{
            const groups = await Groupe.findAll({
                include:[
                    {
                        model:User,
                        as:"entraineur",
                        attributes:["nom","prenom","num_tel"]
                    }
                ]
            });
            if(groups.length === 0) {
                return res.status(404).json({message:"groups is empty"})
            }
            return res.json({message:"groups found",groups})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err});
    }
}


exports.profile = async (req,res) => {
        try{
        const userId = req.userId
        const user = await User.findByPk(userId,
            {
                attributes:{
                    exclude:["password"]
                }
            }
        );
        if (!user) return res.status(400).json({ message: "user not found" });
        
        return res.status(200).json({ message: "user found" , user});
       
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err});
    }
}
