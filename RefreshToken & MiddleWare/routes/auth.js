const express= require("express")
const authRouter= express.Router();
const bcrypt= require("bcrypt")
const User= require("../Models/user")

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
        res.send("Error: "+err.message)

    }

})
module.exports= authRouter;