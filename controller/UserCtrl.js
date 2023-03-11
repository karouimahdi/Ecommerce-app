const User =require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId=require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../config/jwtToken");

const createUser=asyncHandler(async(req,res)=>{
    const email=req.body.email;
    const findUser=await User.findOne({email: email});
    if (!findUser){
        const newUser=User.create(req.body);
        res.json(newUser);
    }else{
        throw new Error("User Already exists")

    }

});
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const findUser =await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)){
  res.json({
    _id:findUser?._id,
    firstName:findUser?.firstName,
    lastName:findUser?.lastName,
    email:findUser?.email,
    mobile:findUser?.phone,
    role:findUser?.role,
    token:generateToken(findUser?._id),
  });
    }
else{
    throw  new Error("invalid password")
}
});
//get all users
const getAllUsers=asyncHandler(async(req,res)=>{
    try{
        const getUsers=await User.find();
        res.json(getUsers);
    }catch(error){
        throw new Error(error);
    }
});
const getaUser=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    validateMongoDbId(id);
    try{
        const getUser= await User.findById(id);
        res.json({
            getUser,
        })
    }catch(error){
        throw new Error(error);
    }
});
const UpdateUser=asyncHandler(async(req,res)=>{
    const{_id}=req.user;
    validateMongoDbId(_id);
    try{
        const updatedUser= await User.findByIdAndUpdate(id,{
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },{
            new:true,
        });
        res.json({
            updatedUser,
        })
    }catch(error){
        throw new Error(error);
    }
});
const deleteUser=asyncHandler(async(req,res)=>{
    const{id}=req.params;

   // validateMongoDbId(id);
    try{
        const deleteUserId= await User.findByIdAndDelete(id);
        res.json({
            deleteUserId,
        })
    }catch(error){
        throw new Error(error);
    }
});
const UserBlocked =asyncHandler(async(req,res)=>{
 const{id}=req.params;

 validateMongoDbId(id);
 try{
    const block=User.findByIdAndUpdate(id,
        {
            isBlocked:true
        },{new:true});
        res.json({
            message:"User Blocked !!!!!"
        });
 }catch(error){
    throw new Error(error);
}  
});
const UnblckedUser =asyncHandler(async(req,res)=>{
    const{id}=req.params;

    validateMongoDbId(id);
    try{
       const unblock=User.findByIdAndUpdate(id,
           {
               isBlocked:false
           },{new:true});
           res.json({
               message:"User unblocked!!!! "
           });
    }catch(error){
       throw new Error(error);
   }  
   });
module.exports={createUser,UserBlocked,UnblckedUser,loginUser,getAllUsers,getaUser,deleteUser,UpdateUser}