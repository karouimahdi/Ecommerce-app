const mongoose=require("mongoose");
const validateMongoDbId=(id)=>{ 
    const isValid=mongoose.Types.ObjectIdis.isValid(id);
    if (!isValid) throw new Error("this id is not valid!!!");};
    module.exports=validateMongoDbId;