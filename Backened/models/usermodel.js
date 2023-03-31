const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    pass:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}

