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
console.log(process.env)

app.post("/register",async(req,res)=>{
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

app.post("/login",async(req, res)=>{
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


app.delete("/user/:id",userAuth,async(req,res)=>{
    try{
    const index= await User.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");

    }
    catch{
        res.status(500).send("Something error")
    }
})

app.patch("/user",userAuth,async(req,res)=>{

    try{
        const {_id, ...update}= req.body;
           await User.findByIdAndUpdate(_id, update)
            res.send("Updated Successfully")
          
    }
    catch{
        res.status(500).send("Find Something Wrong")
    }
})

app.get("/user",userAuth,async(req,res)=>{
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

main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(process.env.PORT,()=>{
    console.log("Listen at port 3000");
})


})
.catch((err)=> console.log(err));


