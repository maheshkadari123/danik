let mongoose=require("mongoose")
let cartsch=new mongoose.Schema({
    "_id":String,
    "pid":String,
    "name":String,
    "uid":String,
    "pimg":String,
    "cat":String,
    "price":Number,
    "qty":Number,
    "desc":String
})
let cartmodel=mongoose.model("cart",cartsch)
module.exports=cartmodel