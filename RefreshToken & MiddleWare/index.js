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

const authRouter= require("./routes/auth");
const userRouter = require("./routes/user");


app.use("/",authRouter);

app.use("/user",userRouter);

main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(process.env.PORT,()=>{
    console.log("Listen at port 3000");
})


})
.catch((err)=> console.log(err));


