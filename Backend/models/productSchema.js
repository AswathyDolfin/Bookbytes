const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    featured:{
        type:String,
        required:true
    },
   genre:{
    type:String,
    required:true
   },
   dis:{
    type:String,
    required:true
   }
})
const Product=mongoose.model("prod",productSchema)

module.exports=Product