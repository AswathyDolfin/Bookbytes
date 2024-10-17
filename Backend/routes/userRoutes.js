const express=require("express")
const router=express.Router()
const userController=require("../controllers/usercontroller")

router.post("/create",userController.createUser)
router.post("/log",userController.loginUser)
router.post("/crt",userController.addToCart)
router.post("/like",userController.addToLike)
router.post("/unlike",userController.removeFromLike)
router.post("/uncart",userController.removeFromCart)
router.post("/getcart",userController.getCartItems)
router.post("/getlike",userController.getLikeItems)
router.get("/getUser",userController.getUsers)
router.post("/banuser",userController.banUser)
router.post("/getOrders", userController.getOrders);
router.post("/addOrder", userController.addOrder);
module.exports=router