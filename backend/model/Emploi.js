const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const Groupe = require("./Groupe")

const Emploi = sequelize.define("emploi", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  jour: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  heure_debut: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  heure_fin: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  groupe_id: {
    type: DataTypes.BIGINT,
    references: {
      model: Groupe,
      key: "id",
    },
  },
})

module.exports = Emploi