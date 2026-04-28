const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue:0
    
  },

})

module.exports = Product