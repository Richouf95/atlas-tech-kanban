const express = require('express');
const {
    getAllLabels,
    getSingleLabel,
    createLabel,
    updateLabel,
    deleteLabel
} = require('../controllers/labelControllers');

const router = express.Router();

// Get All Labels
router.get('/', getAllLabels);

// Get Single Label
router.get('/:id', getSingleLabel);

// Create Label
router.post('/create-label', createLabel);

// Update Label
router.patch('/:id', updateLabel);

// Delete Label
router.delete('/:id', deleteLabel);

module.exports = router;
