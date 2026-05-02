const { body, validationResult, param } = require("express-validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { Groupe, GroupeJoueur, ParentChild, PricingCategories, TestJoueur } = require("../model");
const { Op } = require("sequelize");
const sequelize = require("../config/db");

exports.addUser = [
    body("nom").notEmpty().withMessage("nom is required"),
    body("prenom").notEmpty().withMessage("prenom is required"),
    body("email").notEmpty().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
    body("role").notEmpty().withMessage("role is required"),
    body("addresse").notEmpty().withMessage("addresse is required"),
    body("num_tel").notEmpty().withMessage("num tel is required"),
    body("dateNaissance").notEmpty().withMessage("date Naissance is required"),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
        try{
        const {nom,prenom,email,password,phone,role,num_tel,addresse,dateNaissance} = req.body;
        const existEmail = await User.findOne({ where: { email:email.toLowerCase() } });
        const existPhone = await User.findOne({ where: { num_tel } });

            let errors = {};
            if (existEmail) {
            errors.email = "email is already used";
            }
            if (existPhone) {
            errors.phone = "phone is already used";
            }
            if (Object.keys(errors).length > 0) {
            return res.status(422).json({
                message: "Validation error",
                errors
            });
            }
        const hashed = await bcrypt.hash(password,10)
        const user = await User.create({nom,prenom,email:email.toLowerCase(),password:hashed,addresse,role,num_tel,dateNaissance});
        return res.status(201).json({message:"account created"});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"});
    }
}
]
exports.getUsers = async (req,res) => {
        try{
            const {role} = req.params
            const users = await User.findAll({
                where :{
                    role
                }
            });
            if(users.length === 0) {
                return res.status(404).json({message:"users is empty"})
            }
            return res.json({message:"users found",users})
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

exports.getJoueurByAge =  async (req,res) => {
        try{
            const {id} = req.params;
            const group = await PricingCategories.findOne({
                include:[
                    {
                        model:Groupe,
                        as:"groupePricing",
                        where: {id:id},
                        attributes:["level"]
                    }
                ]
            })
           if (!group) {
            return res.status(404).json({ message: "Group not found" });
            }
      const today = new Date()

        const min = group.min_age;
        const max = group.max_age;

        const minDate = new Date(
            today.getFullYear() - max,
            today.getMonth(),
            today.getDate()
        )

        const maxDate = new Date(
            today.getFullYear() - min,
            today.getMonth(),
            today.getDate()
        )

        let players = await User.findAll({
            attributes:{exclude:["password"]},
        where: {
            joueurLevel:group.groupePricing.level,
            role: "joueur",
            dateNaissance: {
            [Op.between]: [minDate, maxDate],
            },
            "$groupeJoueur.id$": null,
        },
        include: [
            {
            model: GroupeJoueur,
            as: "groupeJoueur",
            required: false,
            attributes: [] 
            },
    ],
    })
            if(players.length === 0) {
                return res.status(200).json({message:"there are not have players with that age"})
            }
            return res.json({message:"users found",players})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"});
    }
}

exports.addChild = [
    body("nom").notEmpty().withMessage("nom is required"),
    body("prenom").notEmpty().withMessage("prenom is required"),
    body("dateNaissance").notEmpty().withMessage("date Naissance is required"),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
        try{
            const userId = req.userId
        const {nom,prenom,dateNaissance} = req.body;
        const user = await User.create({nom,prenom,dateNaissance,role:"joueur"});
        await ParentChild.create({parent_id:userId,joueur_id:user.id})
        return res.status(201).json({message:"child created"});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"});
    }
}
]

exports.getChild =  async (req,res) => {
        try{
        const userId = req.userId
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        const children = await ParentChild.findAll({
            where: { parent_id: userId },
            include: [
                {
                model: User,
                as: "joueurParent",
                attributes: ["id", "nom", "prenom"]
                }
            ]
            })
        return res.status(201).json({message:"children",children});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"});
    }
}

exports.playersNoLevel = async (req, res) => {
  try {
  const users = await User.findAll({
  where: {
    role: "joueur",
    joueurLevel: null
  },
  attributes: { exclude: ["password"] },
  include: [
    {
      model: TestJoueur,
      as: "testerJoueur",
      required: false
    }
  ]
})

const result = users.filter(user => {
  const tests = user.testerJoueur || []

  if (tests.length === 0) return true

  return tests.some(t => t.status === "absent")
})

return res.status(200).json({
  message: "filtered players",
  users: result
})

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "server error" })
  }
}