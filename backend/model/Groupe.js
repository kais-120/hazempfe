const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Groupe = sequelize.define("groupe",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    libelle:{
        type:DataTypes.STRING(20),
    },
    entraineur_id:{
        type:DataTypes.BIGINT,
        references:{
            model:User,
            key:"id"
        }
    },
    
})

module.exports = Groupe;