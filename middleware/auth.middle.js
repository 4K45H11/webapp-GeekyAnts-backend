const User = require('../models/User.model')
const jwt = require('jsonwebtoken')

exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(400).json({ message: 'un-authorized' })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select('-password')
        next();
    } catch (error) {
        res.status(401).json({message:'token invalid'})
    }
}

//update 
exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:'access denied'})
        }

        next();
    }
}