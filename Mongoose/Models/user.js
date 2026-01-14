const mongoose = require('mongoose')
const {Schema}= mongoose;


 const userschema= new Schema({
    name:String ,
    age:Number,
    city:String,
    gender:String
  })


const User =mongoose.model("user",userschema);
module.exports=User