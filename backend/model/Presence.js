const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const User = require("./User")
const Groupe = require("./Groupe")

const Attendance = sequelize.define("presence", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  jour: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  joueur_id: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: "id",
    },
  },
  groupe_id: {
    type: DataTypes.BIGINT,
    references: {
      model: Groupe,
      key: "id",
    },
  },
  status:{
     type: DataTypes.ENUM("present", "absent"),
    allowNull: false,
    defaultValue: "present",
  }
})

module.exports = Attendance