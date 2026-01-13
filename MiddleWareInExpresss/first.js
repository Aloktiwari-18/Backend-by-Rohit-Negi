const express= require("express")

const app= express();

app.use("/user",(req,res,next)=>{
    console.log("First")
    // res.send("Hello Jii")
    next();
} , // Route handler hota hai ye
(req, res,next)=>{
    console.log("Second")
    // res.send("I am the second")
    next()
},
(req, res)=>{
    console.log("Third")
    res.send("I am the third")
}
)

//Middleware save line of code and it help to reduce the repeatetive line of code


app.use("/user",(req,res,next)=>{
    console.log(`${Date.now()} ${req.method} ${req.url}`)
    next()
})


app.get("/user",(req,res,next)=>{
    res.send("Information about user")

})

app.post("/user",(req,res)=>{

    res.send("information saved")
})


app.delete("/user",(req,res)=>{

    res.send("Information Deleted")
})



app.listen(3000,()=>{
    console.log("Listen at port 3000")
})

//. Koi bhi Request aayi uske LOG ko maintain karna pdta hai
// Timing , Kis type ka request hai , url type ky hai