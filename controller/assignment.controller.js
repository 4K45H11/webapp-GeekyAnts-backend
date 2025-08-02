const Assignment = require('../models/Assignment.model')
const Engineer = require('../models/Engineer.model')
const Project = require('../models/Project.model')

exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate({
                path: 'engineer',
                populate: { path: 'user', select: 'name email' }
            })
            .populate('project', 'name')

        res.json(assignments)
    } catch (error) {
        res.status(500).json({ message: 'error fetching assignments', error: error.message })
    }
}

exports.getAssignmentsByEngineer = async(req,res)=>{
    try {
        const {id} = req.params;

        const assignments = await Assignment.find({engineer: id}).populate('project','name durationWeeks')

        res.json(assignments);


    } catch (error) {
        res.status(500).json({ message: 'error fetching engineer assignments', error: error.message })
    }
}