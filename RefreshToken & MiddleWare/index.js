const express= require("express")

const app= express();
const main=require("./database")
const User=require("./Models/user")
app.use(express.json())
const validUser= require("./utils/validateUser")
const bcrypt=require("bcrypt")
const cookieParser= require('cookie-parser')
app.use(cookieParser())
const jwt= require('jsonwebtoken')

const userAuth= require("./MiddleWare/userAuthentication")
require('dotenv').config()
const rateLimiter= require("./MiddleWare/rateLimiter")

app.use(rateLimiter);

const authRouter= require("./routes/auth");
const userRouter = require("./routes/user");
const redisClient=require("./config/redis");


app.use("/",authRouter);

app.use("/user",userRouter);

const InitializeConnection= async()=>{
    try{
        await redisClient.connect();
        console.log("Connected to Reddis")
        await main();
        console.log("Connected to MongoDB");


        app.listen(process.env.PORT,()=>{
    console.log("Listen at port 3000");
})

        


    }catch(err){
        console.log("Error"+err)

    }
}

InitializeConnection();

