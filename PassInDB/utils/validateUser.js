const validator=require("validator");
function validUser(data){
    const mandatoryField= ["firstName","emailId","age"];
    const isAllowed= mandatoryField.every((k)=>Object.keys(data).includes(k));
    if(!isAllowed)
        throw new Error("Field Missing")
  if (!validator.isEmail(data.emailId)) {
        throw new Error("Invalid Email");
    }

    if(!validator.isStrongPassword(data.password)){
        throw new Error("Week Password")
    }

    if(!(data.firstName.length>=3 && data.firstName.length<=23)){
        throw new Error("Invalid firstName")
    }
  

};

module.exports=validUser;
