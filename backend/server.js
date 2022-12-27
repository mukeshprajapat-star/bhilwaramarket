const express=require("express")
const app=require("./app")
const connectDatabase=require("./config/database")
const cloudinary=require("cloudinary");

// handle uncaughtException

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting up the server due to uncaughtException");
    process.exit(1)
});
if(process.env.NODE_ENV !=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}

connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const server=app.listen(process.env.PORT,()=>{
    console.log(`server is start ${process.env.PORT}`)
})
//console.log(youtube)
process.on("unhandleRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting up the server due to unhandled promise Rejection");

    server.close(() => {
        process.exit(1);
    });    
})