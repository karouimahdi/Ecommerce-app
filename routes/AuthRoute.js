const express=require("express");
const { UserBlocked,UnblckedUser,UpdateUser,createUser ,loginUser,getAllUsers,getaUser,deleteUser} = require("../controller/UserCtrl");
const{authMiddelware,isAdmin}=require("../middelwares/AuthMiddelwares")
const router=express.Router();
router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/get-user",getAllUsers);
router.get("/:id",authMiddelware,isAdmin,getaUser);
router.delete("/:id",deleteUser);
router.put("/edit-user",authMiddelware,UpdateUser);
router.put("/block-user/:id",authMiddelware,isAdmin,UserBlocked);
router.put("/unblock-user/:id",authMiddelware,isAdmin,UnblckedUser);
module.exports=router;