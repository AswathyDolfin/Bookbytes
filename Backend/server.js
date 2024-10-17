const express = require("express")
const cors = require("cors")
const port = 5000
const connectDB = require('./config/db')
const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')
const app = express()

app.use(cors())
app.use(express.json())

connectDB()
app.use('/api/products', productRouter)
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.listen(port, () => {
  console.log(`server running at port,${port}`);
})