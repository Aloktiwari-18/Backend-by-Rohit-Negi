
const redisClient=require("../config/redis")


// incr= ip+1

const rateLimiter= async(req, res, next)=>{
    try{
      const ip= req.ip;
       
    // kya ip exist karta hai
    // set Method redisClint.set(ip,`1${Date.now()/1000}`)
    // await redisClient.expire(3600);


      const number_of_req=await redisClient.incr(ip);

      // TTL
      if(number_of_req==1){
       await redisClient.expire(3600);
      }

      if(number_of_req>5){
        throw new Error("User Limit Exceeded");
      }
      console.log(number_of_req)
      next();

    }
    catch(err){
        res.send("Error"+err.message);
    }
}

module.exports=rateLimiter;