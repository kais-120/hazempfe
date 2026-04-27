const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const User = require("./User")

const Payment = sequelize.define("payment", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  joueur_id: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: "id",
    },
  },
  method_payment: {
    type: DataTypes.ENUM("espèce","en ligne"),
    allowNull: false,
  },
  amount:{
    type: DataTypes.FLOAT,
  }
})

module.exports = Payment