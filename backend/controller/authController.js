const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { PricingCategories } = require("../model");
const { Op } = require("sequelize");
const Subscriptions = require("../model/Subscriptions");

function calculateAge(dateNaissance) {
  const today = new Date()
  const birthDate = new Date(dateNaissance)

  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

function calculateProratedAmount(price) {
  const today = new Date()

  const year = today.getFullYear()
  const month = today.getMonth()

  // عدد أيام الشهر
  const totalDays = new Date(year, month + 1, 0).getDate()

  // اليوم الحالي
  const currentDay = today.getDate()

  // الأيام المتبقية
  const remainingDays = totalDays - currentDay + 1

  // الحساب
  const amount = (price / totalDays) * remainingDays

  return Math.round(amount * 100) / 100 // 2 decimals
}

exports.register = [
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
        if(role === "joueur"){
        const age = calculateAge(dateNaissance)

        const pricing = await PricingCategories.findOne({
        where: {
            min_age: { [Op.lte]: age },
            max_age: { [Op.gte]: age }
        }
        })
        const currentMonth = new Date().toISOString().slice(0, 7)
        const proratedAmount = calculateProratedAmount(pricing.price)
            await Subscriptions.create({
            user_id: user.id,
            month: currentMonth,
            amount: proratedAmount,
            status: "unpaid"
            })
        }
        return res.status(201).json({message:"account created"});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"});
    }
}
]
exports.login = [
    body("email").notEmpty().withMessage("email required"),
    body("password").notEmpty().withMessage("password required"),
    async (req,res) => {
 const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
        try{
        const {email,password} = req.body;
        const user = await User.findOne({where: {email:email.toLowerCase()} });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({sub:user.id,iss:"domain",aud:"name"},process.env.JWTKEY);
        return res.status(200).json({ message: "valid credentials" , token : token , role : user.role });
       
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err});
    }
}
]

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
        return res.status(500).json({message:"error server"});
    }
}
