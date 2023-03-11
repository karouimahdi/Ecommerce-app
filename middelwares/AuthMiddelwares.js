const User= require('../models/UserModel');
const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");
const authMiddelware=asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1];
        try{
            if (token){
                const decoded=jwt.verify(token,process.env.JWT_SECRET);
               const user=await User.findById(decoded?.id);
               req.user=user;
               next();
            }
              
        } catch(error){
            throw new Error("Not autthorized token expired,please login again")
        }
    }else{
        throw new Error("there is no token attached to header")
    }

});
const isAdmin=asyncHandler(async(req,res,next)=>{
    const{email}=req.user;
    const adminUser=await User.findOne({email});
    if(adminUser.role!=="admin"){
        throw new Error("you not admin!!!");
    }
    else{
        next();
    }
})
module.exports={authMiddelware,isAdmin}