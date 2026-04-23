const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const ParentChild = sequelize.define("parent_children",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    parent_id:{
        type:DataTypes.BIGINT,
        references:{
            model:User,
            key:"id"
        }
    },
    joueur_id:{
        type:DataTypes.BIGINT,
        references:{
            model:User,
            key:"id"
        }
    },
    status:{
        type:DataTypes.STRING,
    },
})

module.exports = ParentChild;