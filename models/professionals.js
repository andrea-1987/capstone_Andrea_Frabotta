const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    age: {
      type: Number,
      required: false,
      default: 0,
    },
    icon: {
      type: String,
      required: false,
      default:
        "https://static.vecteezy.com/system/resources/previews/000/649/115/original/user-icon-symbol-sign-vector.jpg",
    },
    job: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      require: false,
      default: "professional",
    },
    preferWorks: {
      type: [],
      required: false,
      default: [],
    },
    myWorks:{
      type:[],
      required:false,
      default:[]
    }
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model(
  "ProfessionalModel",
  ProfessionalSchema,
  "professionals"
);
