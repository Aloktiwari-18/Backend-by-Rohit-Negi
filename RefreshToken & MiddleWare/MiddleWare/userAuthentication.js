const User= require("../Models/user")
const jwt= require('jsonwebtoken')
const userAuth= async(req,res,next)=>{
    try{
        const {token}=req.cookies;
    if(!token){
        throw new Error("Token doesn't exist")
    }


        const payload=   jwt.verify(token,process.env.SECRET_KEY)
    
        const{_id}=payload;
        if(!_id){
            throw new Error("Id is missing")
        }
        const result=await User.findById(_id);
        req.result=result;
        
        next();
        
    }
    catch(err){
        res.send("Error"+err.message);

    }
}

module.exports=userAuth;