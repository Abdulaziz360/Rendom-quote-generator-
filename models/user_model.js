 const mongoose=require('mongoose')
 const validator=require('validator')
 const user_schema=new mongoose.Schema({
fname:{
    type:String,
    required:true,
    // validate(val) {
    //     if (validator.isNumeric(val)) {
    //         throw new Error("Last name can't be numeric");
    //     }
    // },
},
lname:{
    type:String,
    required:true,
    // validate(val) {
    //     if (validator.isNumeric(val)) {
    //         throw new Error("Last name can't be numeric");
    //     }
    // }
},
phone:{
    type:String,
    required:true,
    // validate(value){
    //     if(!validator.isNumeric(value)){
    //         throw new Error ('Phone number must be numeric');
    //     }
    // }
},
email:{
    type:String,
    required:true,
    // validate(value){
    //     if(!validator.isEmail(value)){
    //         throw new Error ('invalid email');
    //     }
    // }
},
password:{
    type:String,
    required:true
},
tokens: [{
    token: {
        type: String,
        required: true
    }
}]

 })
 module.exports=new mongoose.model('User',user_schema)