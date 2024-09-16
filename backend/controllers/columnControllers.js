const Column = require('../models/ColumnModel');
const mongoose = require('mongoose');

// Get all Board Columns
const getBoardColumns = async (req, res) => {
    const { boardId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
        return res.status(400).json({ error: "Invalid board ID" });
    }

    try {
        const columns = await Column.find({ boardId }).lean();
        return res.status(200).json(columns);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Get Signle Column
const getSingleColumn = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid column ID" });
    }

    try {
        const column = await Column.findById(id).lean();
        if (!column) {
            return res.status(404).json({ error: "No such column" });
        }
        return res.status(200).json(column);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Create Column
const createColumn = async (req, res) => {
    const { name, index, boardId } = req.body;

    if (!name || !index || !boardId) {
        return res.status(400).json({ error: "Name, index, and boardId are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
        return res.status(400).json({ error: "Invalid board ID" });
    }

    try {
        const column = await Column.create({
            name,
            index,
            boardId
        })

        return res.status(201).json(column);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// Update Column
const updateColumn = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid column ID" })
    }

    try {
        const column = await Column.findByIdAndUpdate(id, req.body, { new: true }).lean();

        if (!column) {
            return res.status(404).json({ error: "No such column" });
        }

        return res.status(200).json(column);
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
}

// Delete Column
const deleteColumn = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid column ID" })
    }

    try {
        const column = await Column.findByIdAndDelete(id).lean();

        if (!column) {
            return res.status(404).json({ error: "No such column" });
        }

        return res.status(200).json(column);
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getBoardColumns,
    getSingleColumn,
    createColumn,
    updateColumn,
    deleteColumn
}