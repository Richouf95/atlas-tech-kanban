const Label = require('../models/LabelModel');
const mongoose = require('mongoose');

// Get All Labels
const getAllLabels = async (req, res) => {
    const { boardId } = req.query;

    if (boardId && !mongoose.Types.ObjectId.isValid(boardId)) {
        return res.status(400).json({ error: "Invalid board ID" });
    }

    try {
        const labels = await Label.find({ boardId }).lean();

        return res.status(200).json(labels);
    } catch (err) {
        return res.status(500).json({ error: "Error fetching labels", details: err.message });
    }
}

// Get Single Label
const getSingleLabel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid label ID" });
    }

    try {
        const label = await Label.findById(id).lean();

        if (!label) {
            return res.status(404).json({ error: "No such label" });
        }

        return res.status(200).json(label);
    } catch (err) {
        return res.status(500).json({ error: "Error fetching label", details: err.message });
    }
}

// Create Label
const createLabel = async (req, res) => {
    const { name, color, boardId } = req.body;

    try {
        const label = await Label.create({ name, color, boardId });

        return res.status(201).json(label);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// Update Label
const updateLabel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid label ID" });
    }

    try {
        const label = await Label.findByIdAndUpdate(id, req.body, { new: true });

        if (!label) {
            return res.status(404).json({ error: "No such label" });
        }

        return res.status(200).json(label);
    } catch (err) {
        return res.status(500).json({ error: "Error updating label", details: err.message });
    }
}

// Delete Label
const deleteLabel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid label ID" });
    }

    try {
        const label = await Label.findByIdAndDelete(id);

        if (!label) {
            return res.status(404).json({ error: "No such label" });
        }

        return res.status(200).json(label);
    } catch (err) {
        return res.status(500).json({ error: "Error deleting label", details: err.message });
    }
}

module.exports = {
    getAllLabels,
    getSingleLabel,
    createLabel,
    updateLabel,
    deleteLabel
}
