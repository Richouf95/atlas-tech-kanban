const Card = require('../models/CardModel');
const mongoose = require('mongoose');

// Get All Cards
const getAllCards = async (req, res) => {
    const { boardId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
        return res.status(400).json({ error: "Invalid board ID" });
    }

    try {
        const cards = await Card.find({ boardId }).lean();
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).json({ error: "Error fetching cards", details: err.message });
    }
}

// Get Single Card
const getSingleCard = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid card ID" });
    }

    try {
        const card = await Card.findById(id).lean();

        if (!card) {
            return res.status(404).json({ error: "No such card" });
        }

        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ error: "Error fetching card", details: err.message });
    }
}

// Create Card
const createCard = async (req, res) => {
    const { name, index, columnId, boardId } = req.body;

    try {
        const card = await Card.create({
            name,
            index,
            columnId,
            boardId
        });

        res.status(201).json(card);
    } catch (err) {
        res.status(400).json({ error: "Error creating card", details: err.message });
    }
}

// Update Card
const updateCard = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid card ID" });
    }

    try {
        const card = await Card.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        ).lean();

        if (!card) {
            return res.status(404).json({ error: "No such card" });
        }

        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ error: "Error updating card", details: err.message });
    }
}

// Delete Card
const deleteCard = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid card ID" });
    }

    try {
        const card = await Card.findByIdAndDelete(id).lean();

        if (!card) {
            return res.status(404).json({ error: "No such card" });
        }

        res.status(200).json({ message: "Card deleted successfully", card });
    } catch (err) {
        res.status(500).json({ error: "Error deleting card", details: err.message });
    }
}

module.exports = {
    getAllCards,
    getSingleCard,
    createCard,
    updateCard,
    deleteCard
}
