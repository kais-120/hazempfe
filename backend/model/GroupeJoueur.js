const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Groupe = require("./Groupe");

const GroupeJoueur = sequelize.define("groupe_joueur",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    joueur_id:{
        type:DataTypes.BIGINT,
        references:{
            model:User,
            key:"id"
        }
    },
    groupe_id:{
        type:DataTypes.BIGINT,
        references:{
            model:Groupe,
            key:"id"
        }
    },
    
})

module.exports = GroupeJoueur;