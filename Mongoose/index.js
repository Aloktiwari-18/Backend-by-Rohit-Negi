const express= require("express")

const app= express();
const main=require("./database")
const User=require("./Models/user")
app.use(express.json())

app.get("/info",async (req,res)=>{
   const user= await User.find({})
   res.send(user);
})

app.post("/info",async (req,res)=>{
    // const ans= new User(req.body);
    // await ans.save();
try{
    await User.create(req.body);
    res.send("Successfully updated")

}
catch(err){
    res.status(500).send(err);
}
})

app.delete("/info", async (req,res)=>{
    await User.deleteOne({name:"Ram"});
    res.send("Deleted")
})

app.put("/info",async (req, res)=>{
    const result= await User.updateOne({name:"Akhil"},{name:"Akhilesh",city:"Bengluru"});
    res.send("Successfully Updated")

})





main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(3000,()=>{
    console.log("Listen at port 3000");
})
const result= await User.find({name:"Rohit"})
console.log(result)

})
.catch((err)=> console.log(err));


