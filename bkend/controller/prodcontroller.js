let prodmodel=require("../model/prodmodel")
let multer=require("multer")
let {v4:uuidv4}=require("uuid")
let fs=require("fs")
const cartmodel = require("../model/cartmodel")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './productimg')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
  const upload = multer({ storage: storage })
  let addprod=async(req,res)=>{
    try{
        let pid=uuidv4()
       let data=new prodmodel({...req.body,"_id":pid,"pimg":req.file.filename})
       await data.save()
       res.json({"msg":"product is added successfully"})

    }
    catch(err){
        res.json({"msg":"err in adding product"})

    }
    
    
  }
  let getprod=async(req,res)=>{
    try{
       let data=await prodmodel.find()
       res.json(data)
    }
    catch(err){
       res.json({"msg":"err in fetching products"})
    }
  }
  let getcat=async(req,res)=>{
    try{
      let data=await prodmodel.find({"cat":req.params.cat})
      res.json(data)
    }
    catch(err){
      console.log(err)
    }
  }
  let addcart=async(req,res)=>{
    try{
    let data=await cartmodel.find({"uid":req.body.uid,"pid":req.body.pid})
     if(data.length==0){ 
     let cid=uuidv4()
     let data=new cartmodel({...req.body,"_id":cid})
     await data.save()
     res.json({"msg":" product is added to cart"})
     }
     else{
      await cartmodel.findByIdAndUpdate({"_id":data[0]._id},{"qty":data[0].qty+1})
     
      res.json({"msg":"qty is updated"})
     }
    }
    catch(err){
      res.json({"msg":" err in adding cart"})
    }
  }
  let getcart=async(req,res)=>{
    try{
       let data=await cartmodel.find({"uid":req.params.uid})
       res.json(data)
    }
    catch(err){
      res.json({"msg":" err in getting cart"})
    }
  }
  let delcart=async(req,res)=>{
    try{
      await cartmodel.findByIdAndDelete({"_id":req.params.cid})
      res.json({"msg":"deletion is done"})
    }
    catch(err){

    }
  }
  let dec=async(req,res)=>{
    try{
    await cartmodel.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":-1}})
    res.json({"msg":"decrement is done"})
    }
    catch(err){

    }
  }
  let inc=async(req,res)=>{
    try{
     await cartmodel.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":1}})
     res.json({"msg":"increment is done"})
    }
    catch(err){

    }
  }
  let delproduct=async(req,res)=>{
    try{
     await prodmodel.findByIdAndDelete({"_id":req.params.pid})
     fs.rm(`./productimg/${req.params.pimg}`,()=>{})
     res.json({"msg":"deletion of product is done"})
    }
    catch(err){
      res.json({"msg":" err in deletion of product"})
    }
  }
  let updprod=async(req,res)=>{
    try{
      let {name,desc,price,cat}=req.body
       let data=await prodmodel.findByIdAndUpdate({"_id":req.body._id},{name,desc,price,cat})
       res.json({"msg":"updation is done"})
    }
    catch(err){

    }
  }
  let addcom=async(req,res)=>{
    try{
      let data={...req.body}
      delete data['pid']
      await prodmodel.findByIdAndUpdate({"_id":req.body.pid},{$push:{"comm":data}})
      res.json({"msg":"comment is added"})
    }
    catch(err){

    }
  }
  let getprdbyid=async(req,res)=>{
    try{
     let data=await prodmodel.findById({"_id":req.params.pid})
     res.json(data)
    }
    catch(err){

    }
  }
 
  module.exports={addprod,getprod,upload,getcat,addcart,getcart,delcart,dec,inc,delproduct,updprod,addcom,getprdbyid}
  