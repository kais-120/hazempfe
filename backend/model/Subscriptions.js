const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const User = require("./User")

const Subscriptions = sequelize.define("subscriptions", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  month : {
    type: DataTypes.STRING,
    allowNull: false,
  },

  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("paid","unpaid"),
    allowNull: false,
  },

  user_id: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: "id",
    },
  },
})

module.exports = Subscriptions