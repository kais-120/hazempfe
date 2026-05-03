const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Message = sequelize.define("messages",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    user_id:{
        type:DataTypes.BIGINT,
        references:{
            model:User,
            key:"id"
        }
    },
    message:{
        type:DataTypes.STRING,
    },
    type:{
        type:DataTypes.ENUM("admin","user"),
    },
})

module.exports = Message;