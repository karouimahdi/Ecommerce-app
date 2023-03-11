const express=require("express");
const bodyParser=require("body-parser");
const dbConnect = require("./config/dbConnect");
const {ErrorHandler,notFound } = require("./middelwares/ErrorHandler");
const app=express();
const dotenv=require("dotenv").config();
const PORT=process.env.PORT || 4000;
const authRouter = require("./routes/AuthRoute");
const cookieParser=require("cookie-parser");
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use(ErrorHandler);
app.use(notFound);
app.listen(PORT,()=>{
   
   
    console.log(`Listening on port ${PORT}...`);});