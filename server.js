const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

//initial middlewares
app.use(cors())
app.use(express.json())

//root route
app.get('/api',(req,res)=>{
    res.status(200).json({message:'Welcome to the GeekyAnt server'})
})

//routes

app.use('/api/auth',require('./routes/auth.route'))
app.use('/api/engineers',require('./routes/engineer.route'))
app.use('/api/projects',require('./routes/project.route'))

app.use('/api/assignments', require('./routes/assignments.route'))
app.use('/api/users', require('./routes/user.route'))

//server listening and db connection

mongoose.connect(process.env.MONGO_URI)
.then((res)=>{
    console.log(`connected to database`)
    app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
})
.catch((err)=>{
    console.log('error connecting DB')
    console.log(err.message)
})