const { body } = require("express-validator");
const { User } = require("../model");
const Payment = require("../model/Payment");

exports.createPayment = [
body("amount").notEmpty().withMessage("amount is required")
    ,async (req,res) => {

}
]

exports.DatePaymentVerify = async (req,res) => {
    try{
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const userId = req.userId
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const payment = await Payment.findOne

    }catch{
        return res.status(500).json({message:"server error"})
    }
}
