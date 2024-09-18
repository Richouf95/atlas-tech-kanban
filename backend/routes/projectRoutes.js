const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectControllers');

// Get all projects
router.get('/all-projects', getAllProjects);

// Get Single projet
router.get('/:id', getSingleProject);

// Create project
router.post('/create-project', createProject);

// Update project
router.patch('/:id', updateProject);

// Delete project
router.delete('/:id', deleteProject);

module.exports = router;