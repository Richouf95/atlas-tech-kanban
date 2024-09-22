const express = require('express');
const {
    getAllCards,
    getSingleCard,
    createCard,
    updateCard,
    deleteCard
} = require('../controllers/cardControllers');

const router = express.Router();

// Get All Cards
router.get('/all-cards', getAllCards);

// Get Single Cards
router.get('/:id', getSingleCard);

// Create Card
router.post('/create-card', createCard);

// Update Card
router.patch('/:id', updateCard);

// Delete Card
router.delete('/:id', deleteCard)


module.exports = router;