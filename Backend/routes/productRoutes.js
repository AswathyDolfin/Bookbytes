const express=require("express")
const router=express.Router()
const productController=require("../controllers/productcontroller")

router.post("/addproduct",productController.addProduct)
 router.get("/get",productController.getProducts)
 router.put("/put/:id",productController.updateProduct)
router.delete("/delete/:id",productController.deleteProduct)
module.exports=router