const express = require("express");
const {ProductModel} = require("../models/productmodel")

const productRouter = express.Router()

productRouter.get("/all",async(req,res)=>{
    const product  = await ProductModel.find()
    try {
        res.send(product)
        console.log("All product")
    } catch (error) {
        console.log(error)
    }
})

productRouter.post("/add",async(req,res)=>{
    const payload= req.body
    try {
        const new_product = new ProductModel(payload)
        await new_product.save()
        res.send("added")
    } catch (error) {
        console.log(error)
    }
})

productRouter.patch("/update/:product_id",async(req,res)=>{
    const product_id = req.params.product_id
    const payload = req.body
    try {
      await ProductModel.findByIdAndUpdate({_id:product_id},payload) 
      res.send("updated")
    } catch (error) {
        console.log(error)
    }
})

productRouter.put("/delete/:product_id",async(req,res)=>{
    const product_id = req.params.product_id
    
    try {
      await ProductModel.findByIdAndDelete({_id:product_id}) 
      res.send("deleted")
    } catch (error) {
        console.log(error)
    }
})

module.exports = {productRouter}