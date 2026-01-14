const mongoose = require('mongoose');
async function main(){
   await mongoose.connect("mongodb+srv://Aloktiwari:Alok0018@codingadda.dfgpfuy.mongodb.net/")
}

main()
.then(()=>console.log("Connected to DB"))
.catch((err)=> console.log(err));