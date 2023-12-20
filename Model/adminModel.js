const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
})

module.exports=new mongoose.model("admin",adminSchema)