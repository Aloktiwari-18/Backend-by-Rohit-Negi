const mongoose = require('mongoose');

async function main(){
    await mongoose.connect("mongodb+srv://Aloktiwari:Alok0018@codingadda.dfgpfuy.mongodb.net/BookStore")

//   const userschema= new Schema({
//     name:String ,
//     age:Number,
//     city:String,
//     gender:String
//   })

  // Model ko create karna hai ab
  // Model ko create karna matlb collection ko create karna hai 

//    const User=mongoose.model("user",userschema); //=> yaha User ek class ka kaam karega 
//    const user1=new User({name:"Rohit",age:22,city:"Delhi",gender:"Male"})
//    await user1.save();

//    await User.create({name:"Mohan", age:43,city:"Gurugoan", gender:"Male"});
//    await User.insertMany([{name:"Ram", age:34,city:"Vanaras", gender:"Male"},{name:"Sonam", age:13,city:"Mainpuri", gender:"Female"}])             
//  const ans=await User.find({})
//  console.log(ans);

 // find particular field

//  const ans1= await User.find({name:"Rohit"})
//  console.log(ans1)


}   

module.exports=main

