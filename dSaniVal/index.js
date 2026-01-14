const express= require("express")

const app= express();
const main=require("./database")
const User=require("./Models/user")
app.use(express.json())

app.post("/register", async(req,res)=>{
    try{
    await User.create(req.body);
      res.send("Successfully registred")
    }
    catch(err){
        res.status(500).send("Error "+err)
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


