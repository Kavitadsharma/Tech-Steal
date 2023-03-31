const express=require("express")
const userroute=express.Router()
const {UserModel}=require("../models/usermodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

//registration

userroute.post("/register",async(req,res)=>{
    const{firstname,lastname,username,email,pass}=req.body
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            const user=new UserModel({firstname,lastname,username,email,pass:hash})
            await user.save()
            res.status(200).send({"msg":"registration has been done!"})
        })
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

//login
userroute.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"login successfull!","token":jwt.sign({"userid":user._id},"masai")})
                }else{
                    res.status(400).send({"msg":"wrong credential"})
                }
            })
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


module.exports={
    userroute
}