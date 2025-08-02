const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({
    engineer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    },
    assignedHoursPerWeek:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Assignment',AssignmentSchema)

