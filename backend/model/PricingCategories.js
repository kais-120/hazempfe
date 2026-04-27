const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const PricingCategories = sequelize.define("pricing_categories",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    libelle:{
        type:DataTypes.STRING(20),
    },
    min_age:{
        type:DataTypes.INTEGER,
    },
    max_age:{
        type:DataTypes.INTEGER,
    },
    price:{
        type:DataTypes.FLOAT,
    }
    
})

module.exports = PricingCategories;