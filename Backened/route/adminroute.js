const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {AdminModel} = require("../models/adminmodel")

const adminRouter = express.Router()


adminRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
    const search = await AdminModel.find({email})
    if(search.length>0){
        res.send("you are already registered please login ")
    }else{
        if(req.query.code=="mycompany"){
        
            try {
                bcrypt.hash(password,5,async(err,hash)=>{
                    const user = new AdminModel({name,email,password:hash})
                    await user.save()
                    
                    res.send("Registerd")
                    console.log("Registered")  
          
                })
               
              } catch (error) {
                res.send("something went wrong")
                console.log(error)
              }
        }else{
            res.send("you are not authorised")
        }
    }
    
   
})

adminRouter.post("/login",async(req,res)=>{
  const {email,password} = req.body
  try {
      const user = await AdminModel.find({email})
      if(user.length>0){
          bcrypt.compare(password,user[0].password,(err,result)=>{
              if(result){
                  const token = jwt.sign({"course":"backend"},"jyoti")
                  res.send({"msg":"loggin successful","token":token})
              }else{
                  res.send("please register first")
              }

              
          })
      }else{
          res.send("please register first")
      }
  } catch (error) {
      console.log(error)
  }
})

module.exports = {adminRouter}