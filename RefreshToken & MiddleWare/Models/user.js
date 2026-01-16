const mongoose = require('mongoose')
const {Schema}= mongoose;


 const userschema= new Schema({
    firstName:{
        type: String,
        required:true,
        minLength:3,
        maxLength:20
        
    },
    lastName:{
        type:String
    },
    age:{
        type:Number,
        min:14,
        max:70,
        required:true

    },
    emailId:{

        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true

    },
    password:{
        type:String,

        required:true,
        
    },
    gender:{
        type:String,
        enum:["Male","Female","other"]
    },
    photo:{
        type:String,
        default:"This is the default photo"
    }


  },{timestamps:true})


const User =mongoose.model("user",userschema);
module.exports=User