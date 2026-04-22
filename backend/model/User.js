const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("users",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    nom:{
        type:DataTypes.STRING(20),
    },
    prenom:{
        type:DataTypes.STRING(20),
    },
    email:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING,
    },
    num_tel:{
        type:DataTypes.STRING(8),
    },
    addresse:{
        type:DataTypes.STRING,
    },
    dateNaissance:{
        type:DataTypes.DATEONLY,
    },
    role:{
        type:DataTypes.ENUM("admin","entraineur","joueur","parent"),
    },
})

module.exports = User;