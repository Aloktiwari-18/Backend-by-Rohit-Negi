const Auth=(req,res,next)=>{
    // authentication karna pdega ki kya ye admin hi hai
    // dummy code 
    const token="ABCDEF"
    const Access= token==="ABCDEF"?1:0;
    if(!Access)
        res.status(403).send("No premission");
    
    next();

    
}

module.exports={
    Auth,
}