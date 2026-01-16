const express= require("express")

const app= express();
const main=require("./database")
const User=require("./Models/user")
app.use(express.json())
const validUser= require("./utils/validateUser")
const bcrypt=require("bcrypt")

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
        const people=await User.findById(req.body._id);
        if(!(req.body.emailId===people.emailId))
            throw new Error("Invalid Credential")

        const isAllowed= await bcrypt.compare(req.body.password,people.password);
        if(!isAllowed){
            throw new Error("Invalid Credential");
        }
        res.send("Login Successfully")



    }
    catch(err){
        res.send("Error: "+err.message)

    }

})

app.get("/info",async(req,res)=>{

    try{
        const result=await User.find();
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

app.get("/user/:id",async(req,res)=>{
    try{
        const result=await User.findById(req.params.id);
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


