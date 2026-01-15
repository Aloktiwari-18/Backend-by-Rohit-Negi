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


app.post("/register", async(req,res)=>{
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
        // const people=await User.findById(req.body._id);
        const people=await User.findOne({emailId:req.body.emailId})
        // if(!(req.body.emailId===people.emailId))
        //     throw new Error("Invalid Credential")

        const isAllowed= await bcrypt.compare(req.body.password,people.password);
        if(!isAllowed){
            throw new Error("Invalid Credential");
        }
        // JWT Token

      const token=  jwt.sign({_id:people._id,emailId:people.emailId},"Rohit@123$",{expiresIn:"10d"});
        res.cookie("token",token)
        res.send("Login Successfully")



    }
    catch(err){
        res.send("Error: "+err.message)

    }

})

app.get("/info",async(req,res)=>{

    try{
     const payload=   jwt.verify(req.cookies.token,"Rohit@123$")
     console.log(payload)
    const result=await User.find();
     console.log(req.cookies)
        res.send(result)

    }
    catch{
        res.statusCode(500).send("Error find")
    }
    
})

app.delete("/user/:id",async(req,res)=>{
    try{
    const index= await User.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");

    }
    catch{
        res.status(500).send("Something error")
    }
})

app.patch("/user",async(req,res)=>{

    try{
        const {_id, ...update}= req.body;
           await User.findByIdAndUpdate(_id, update)
            res.send("Updated Successfully")
          
    }
    catch{
        res.status(500).send("Find Something Wrong")
    }
})

app.get("/user",async(req,res)=>{
    try{
        const payload=   jwt.verify(req.cookies.token,"Rohit@123$")
    //  console.log(payload)

        const result=await User.findById(payload._id);
        res.send(result);

    }
    catch{
        res.status(500).send("Error find");
    }
})

main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(3000,()=>{
    console.log("Listen at port 3000");
})


})
.catch((err)=> console.log(err));


