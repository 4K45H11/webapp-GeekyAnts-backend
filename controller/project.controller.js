const Project = require('../models/Project.model')
const Engineer = require('../models/Engineer.model')
const Assignment = require('../models/Assignment.model')

exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body)
        res.status(201).json(project)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { name, description, durationWeeks }, { new: true })

        res.status(200).json(project)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)

        if (project) {
            res.status(200).json({ message: "project deleted successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.assignEngineers = async (req, res) => {
  try {
    const { engineerId, projectId, assignedHoursPerWeek } = req.body;

    const engineer = await Engineer.findById(engineerId);
    if (!engineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    const existingAssignments = await Assignment.find({ engineer: engineerId });

    const totalAssigned = existingAssignments.reduce(
      (sum, a) => sum + a.assignedHoursPerWeek,
      0
    );

    if (totalAssigned + assignedHoursPerWeek > engineer.availableHoursPerWeek) {
      return res.status(400).json({ message: 'Engineer is overbooked' });
    }

    const assignment = await Assignment.create({
      engineer: engineerId,
      project: projectId,
      assignedHoursPerWeek
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error assigning engineer", error: error.message });
  }
};
