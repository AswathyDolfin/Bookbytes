const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        type:Array,
        required:true
    },
    like:{
        type:Array,
        required:true
    },
    banned: {
        type: Boolean,
        default: false
    },
    order: {
        type: Array,
        require: false
    },

})
const User=mongoose.model("user",userSchema)

module.exports=User