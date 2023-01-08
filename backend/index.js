const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("成功")
})
.catch((err)=>{
    console.log(err)
})

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8000,()=>{
 console.log("yaa")
})