let usermodel=require("../model/usermodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const cartmodel = require("../model/cartmodel")
let reguser=async(req,res)=>{
    try{
       let obj=await usermodel.findById({"_id":req.body._id})
       if(obj){
        res.json({"msg":"acc is already exists with the given mail id"})
       }
       else{
        let hashcode=await bcrypt.hash(req.body.pwd,10)
        let data=new usermodel({...req.body,"pwd":hashcode})
        await data.save()
        res.json({"msg":"acc is created"})
       }
    }
    catch(err){

    }
}
let userlogin=async(req,res)=>{
    try{
        let obj=await usermodel.findById({"_id":req.body._id})
        if(obj){
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            
            if(f){
                 let data=await cartmodel.find({"uid":req.body._id})
                res.json({"token":jwt.sign({"_id":obj._id},"1234"),"_id":obj._id,"name":obj.name,"role":obj.role,"noofitems":data.length})
            }
            else{
                res.json({"msg":"check pwd"})
            }
        }
        else{
            res.json({"msg":"check email"}) 
        }
    }
    catch(err){

    }
}
module.exports={reguser,userlogin}