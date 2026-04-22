const jwt = require("jsonwebtoken");
const { User } = require("../model");

module.exports = async (req,res,next) => {
    try {
        const userId = req.userId
        const user =  await User.findByPk(userId);
        if(!user){
          return res.status(404).json({ message: "user not found" });
        }
        if(user.role !== "admin"){
          return res.status(403).json({ message: "Forbidden" });
        }
        return next();
      } catch (err) {
        return res.status(500).json({ message: "error server" });
      }
}