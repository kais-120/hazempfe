const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const appStart = require("./app");
const sequelize = require("./config/db");
require("./model/index")

app.use(express.json());
app.use(cors());

sequelize.sync({ alter: true });

sequelize.authenticate()
  .then(() => console.log("postgresql Connected"))
  .catch(err => console.error("DB Error:", err));

app.use("/api", appStart);

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})
