const express = require('express');
const {
    getBoardColumns,
    getSingleColumn,
    createColumn,
    updateColumn,
    deleteColumn
} = require('../controllers/columnControllers')

const router = express.Router();

// Get all Board Columns
router.get('/', getBoardColumns);

// Get Signle Column
router.get('/:id', getSingleColumn);

// Create Column
router.post('/create-column', createColumn);

// Update Column
router.patch('/:id', updateColumn);

// Delete Column
router.delete('/:id', deleteColumn)


module.exports = router;