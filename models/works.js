const mongoose = require("mongoose");

const WorksSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      max: 40,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);
module.exports=mongoose.model("WorksModel",WorksSchema,"works")