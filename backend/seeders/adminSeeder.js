require("dotenv").config();

const User = require("../model/User");
const bcrypt = require("bcrypt");
async function createAdmin (){
    try{
    const existAdmin = await User.findOne({where: {email:"admin@admin.com"}});
    if(existAdmin){
        console.warn("Admin already exists");
        process.exit();

    }
    const hashed = await bcrypt.hash("123456",10);
    await User.create({nom:"admin",prenom:"admin",email:"admin@admin.com",password:hashed,role:"admin",phone:"55740526",verified_at:Date.now()});
    console.log("Admin created");
    process.exit();
    }catch(err){
        console.log(err);
        process.exit();
    }
}
createAdmin()