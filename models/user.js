const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); 
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
})

userSchema.plugin(passportLocalMongoose); //automatically hashes the login and password
//Adds username + hashed password handling automatically (no need to store raw password).
//that why we only need email of user
module.exports=mongoose.model("User",userSchema);