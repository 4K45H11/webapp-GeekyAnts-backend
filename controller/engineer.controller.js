const Engineer = require('../models/Engineer.model')
const User = require('../models/User.model')

exports.createEngineer = async(req,res)=>{
    try {
        const {user,skills, availableFor} = req.body
        const engineer = await Engineer.create({user,skills,availableFor})

        res.status(201).json(engineer)
    } catch (error) {
        res.status(500).json({ message: "error creating engineer", error: err.message })
    }
}

exports.getAllEngineers = async(req,res)=>{
    try {
        const engineers = await Engineer.find().populate('user','name email role')
        res.json(engineers)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}