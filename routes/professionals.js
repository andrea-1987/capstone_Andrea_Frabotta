const express=require("express");
const router = express.Router();
const professionalController= require("../controllers/professionalController");
const validateProfessional = require("../middlewares/validateProfessionalBody");
const verified = require("../middlewares/verifyToken");
const workController=require("../controllers/worksController")

router.get("/professional",verified,professionalController.getProfessional);

router.get("/professional/:id", professionalController.getSingleProfessional);

router.post("/createProfessional",validateProfessional,professionalController.addProfessional);

router.post("/professional/:id",workController.addSingleWork);

router.patch("/professional/update/:id",professionalController.updateProfessional);

router.delete("/professional/delete/:id",professionalController.deleteProfessional);

module.exports=router