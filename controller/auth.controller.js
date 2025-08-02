const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async(req,res)=>{
    const {name,email,password,role} = req.body;
    try {
        const exists = await User.findOne({email})

        if(exists) {
            return res.status(400).json({message:'user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({name,email,password:hashedPassword,role})

        //will change the time later
        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn:'10m'})

        res.json({token, user:{id:newUser._id,name:newUser.name,role:newUser.role}})
    } catch (error) {
        res.status(500).json({
            message:"registration failed",
            error:error.messag
        })
    }
}

exports.login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const exists = await User.findOne({email})
        if(!exists) return res.status(400).json({error:'invalid email'})
        
        const isMatched = await bcrypt.compare(password, exists.password)

        if(!isMatched) return res.status(400).json({error:'invalid password'})

        const token = jwt.sign({id:exists._id},process.env.JWT_SECRET,{expiresIn:'20m'})

        res.json({token, user:{id:exists._id,name:exists.name,role:exists.role}})

    } catch (error) {
        res.status(500).json({
            message:'login failed',
            error: error.message
        })
    }
}