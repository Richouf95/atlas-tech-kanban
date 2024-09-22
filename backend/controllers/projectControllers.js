const mongoose = require('mongoose');
const ProjectModel = require('../models/ProjectModel');

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find({}).lean();
        return res.status(200).json(projects);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// Get Single projet
const getSingleProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
    }

    try {
        const project = await ProjectModel.findById(id).lean();
        if (!project) {
            return res.status(404).json({ error: "No such project" });
        }
        return res.status(200).json(project);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// Create project
const createProject = async (req, res) => {
    const { name, ownerName, ownerEmail } = req.body;
    console.log({name, ownerName, ownerEmail})
    try {
        const projectAccess = {};
        projectAccess[ownerEmail] = ['room:write'];

        const project = await ProjectModel.create({
            name,
            ownerName,
            usersAccesses: projectAccess,
         });

        return res.status(200).json(project);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// Update project
const updateProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
    }

    try {
        const project = await ProjectModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!project) {
            return res.status(404).json({ error: "No such project" });
        }
        return res.status(200).json(project);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// Delete project
const deleteProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
    }

    try {
        const project = await ProjectModel.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ error: "No such project" });
        }
        return res.status(200).json(project);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject
}