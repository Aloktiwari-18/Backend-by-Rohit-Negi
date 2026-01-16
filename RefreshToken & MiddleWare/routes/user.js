const express= require("express")
const userRouter= express.Router();
const bcrypt= require("bcrypt")
const User= require("../Models/user")
const userAuth= require("../MiddleWare/userAuthentication")
const jwt= require("jsonwebtoken")




userRouter.delete("/user/:id",userAuth,async(req,res)=>{
    try{
    const index= await User.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");

    }
    catch{
        res.status(500).send("Something error")
    }
})

userRouter.patch("/user",userAuth,async(req,res)=>{

    try{
        const {_id, ...update}= req.body;
           await User.findByIdAndUpdate(_id, update)
            res.send("Updated Successfully")
          
    }
    catch{
        res.status(500).send("Find Something Wrong")
    }
})

userRouter.get("/",userAuth,async(req,res)=>{
    try{const {token}=req.cookies;
    if(!token){
        throw new Error("Token doesn't exist")
    }


        const payload=   jwt.verify(token,process.env.SECRET_KEY)
    
        const{_id}=payload;
        if(!_id){
            throw new Error("Id is missing")
        }
        const result=await User.findById(_id);
        res.send(req.result);

    }
    catch{
        res.status(500).send("Error find");
    }
})

module.exports=userRouter