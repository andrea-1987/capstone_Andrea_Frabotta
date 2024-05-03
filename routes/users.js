const express=require("express");
const router = express.Router();
const usersController= require("../controllers/usersController");
const validateUser = require("../middlewares/validateUserBody");
const verified = require("../middlewares/verifyToken");
const workController=require("../controllers/worksController")

router.get("/user",verified, usersController.getUsers);

router.get("/user/:id", usersController.getSingleUsers);

router.post("/createUser",validateUser,usersController.addUser);

router.patch("/user/update/:id",usersController.updateUser);

router.delete("/user/delete/:id",usersController.deleteUser);

module.exports=router