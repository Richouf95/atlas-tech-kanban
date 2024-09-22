const express = require('express');
const {
    getAllBoards,
    getSingleBoard,
    createBoard,
    updateBoard,
    deleteBoard
} = require('../controllers/boardControllers');

const router = express.Router();

// Get All Boards
router.get('/all-boards', getAllBoards);

// Get Single Board
router.get('/:id', getSingleBoard);

// Create Board
router.post('/create-board', createBoard);

// Update Board
router.patch('/:id', updateBoard);

// Delete Board
router.delete('/:id', deleteBoard);

module.exports = router;