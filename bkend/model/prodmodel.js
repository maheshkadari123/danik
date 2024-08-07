let mongoose=require("mongoose")
let prodsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "price":Number,
    "pimg":String,
    "desc":String,
    "cat":String,
    "comm":[]

})
let prodmodel=mongoose.model("prod",prodsch)
module.exports=prodmodel