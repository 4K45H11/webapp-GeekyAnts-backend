const mongoose = require('mongoose')

const EngineerSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    skills:[String],
    availableFor:{
        type: Number,
        default: 40
    }
},{timestamps:true})

module.exports = mongoose.model('Engineer',EngineerSchema)