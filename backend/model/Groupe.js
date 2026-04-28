const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const PricingCategories = require("./PricingCategories");

const Groupe = sequelize.define("groupe",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    libelle:{
        type:DataTypes.STRING(20),
    },
    age_id:{
        type:DataTypes.BIGINT,
        references:{
            model:PricingCategories,
            key:"id"
        }
    },
    level:{
        type:DataTypes.ENUM("débutant", "intermédiaire", "avancé"),
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