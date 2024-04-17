const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectToDataBase = require("./db");
const cors = require("cors");
const path = require("path");
const usersRoutes= require("./routes/users");
const professionalRoutes=require("./routes/professionals");

const PORT = 4040;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", usersRoutes);
app.use("/", professionalRoutes);

connectToDataBase();

app.listen(PORT, () => {
  console.log(`Server connected and listening on port ${PORT}`);
});
