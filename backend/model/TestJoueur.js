const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const TestJoueur = sequelize.define("groupe",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    date_test:{
        type:DataTypes.DATEONLY,
    },
    time_test:{
        type:DataTypes.TIME,
    },
    entraineur_id:{
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
    status: { 
    type:DataTypes.ENUM( "programmé","done","accepté","absent"), 
    defaultValue : "programmé",
    }
    
})

module.exports = TestJoueur;