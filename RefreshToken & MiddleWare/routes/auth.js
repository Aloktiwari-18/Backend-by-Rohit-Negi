const express= require("express")
const authRouter= express.Router();
const bcrypt= require("bcrypt")
const User= require("../Models/user")

const redisClient= require("../config/redis")
const jwt= require('jsonwebtoken')
const userAuth= require("../MiddleWare/userAuthentication")

authRouter.post("/register",async(req,res)=>{
    try{
    validUser(req.body)
    // converting passsword into hash
    req.body.password= await bcrypt.hash(req.body.password,10)
    
    await User.create(req.body);


    res.send("Successfully registred")
    }
    catch(err){
        res.status(500).send("Error "+err)
    }
})

authRouter.post("/login",async(req, res)=>{
    try{
        const people=await User.findOne({emailId:req.body.emailId})
        
        const isAllowed= people.verifyPassword(req.body.password);
        if(!isAllowed){
            throw new Error("Invalid Credential");
        }
        // JWT Token

      const token=  people.getJWT();
        res.cookie("token",token)
        res.send("Login Successfully")



    }
    catch(err){
        res.send("Error: "+err.message )

    }

})

// Redddis k dataBase me humko token insert karna hai
 
authRouter.post("/logout", userAuth,async(req,res)=>{
    try{

        
        const {token}= req.cookies;
        const payload= jwt.decode(token);
        console.log(payload)
        await redisClient.set(`token:${token}`,"Blocked")
        await redisClient.expireAt(`token:${token}`,1800);//payload.exp
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("Logout Successfully")

    }
    catch(err){
        res.send("Error"+err.message);
    }
})


module.exports= authRouter;
