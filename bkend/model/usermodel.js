let mongoose=require("mongoose")
let usersch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "phn":Number,
    "role":{
        "type":String,
        "default":"user"
    }
   
})
let usermodel=mongoose.model("users",usersch)
module.exports=usermodel