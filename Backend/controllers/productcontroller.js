const Product=require("../models/productSchema")

const addProduct=async (req,res)=>{
    try {
        const {name,price,author,image,featured,genre,dis}=req.body
        const product=new Product({name,price,author,image,featured,genre,dis})
        product.save()
        res.status(200).send("product added successfully")
    } catch (error) {
        console.log(error);
    }
}

const updateProduct=async (req,res)=>{
    try {
        const {id}=req.params
        const {name,price,author,image,featured,genre,dis}=req.body

        await Product.findByIdAndUpdate(id,{name,price,author,image,featured,genre,dis},{new:true})
        res.send("Product updated successfully!")
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct=async (req,res)=>{
    try {
        const {id}=req.params
        await Product.findByIdAndDelete(id)
        res.send("Product deleted successfully!")
    } catch (error) {
        console.log(error);
    }
}

const getProducts=async (req,res)=>{
    try {
        const products=await Product.find()
        res.status(200).send(products)
    } catch (error) {
        console.log(error);
    }
}


module.exports={addProduct,
getProducts,
updateProduct,
deleteProduct
}