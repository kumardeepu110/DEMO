const express = require('express')
const mongo = require('./config/db')
const usermodel = require('./apis/user/userModel')
const usercontroller = require('./apis/user/userController')
const userroutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())
app.use('/admin',userroutes)

app.listen(5000, (err)=>{
    console.log("server is already started");
})