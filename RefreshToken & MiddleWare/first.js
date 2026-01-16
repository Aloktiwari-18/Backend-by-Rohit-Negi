const bcrypt= require("bcrypt")
const password= "Alok@123"



async function Hashing(){
    
    const  salt =  await bcrypt.genSalt(10);
    const hashpass= await bcrypt.hash(password,salt)

    const ans= await bcrypt.compare(password, hashpass)

    console.log(ans)
   

}

Hashing();
 


