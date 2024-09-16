const Board = require('../models/BoardModel');
const mongoose = require('mongoose');

// Get All Boards
const getAllBoards = async (req, res) => {
    const boards = await Board.find({}).lean();

    return res.status(200).json(boards);
}

// Get Single Board
const getSingleBoard = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such board" })
    }

    try {
        const board = await Board.findById(id).lean();

        if (!board) {
            return res.status(404).json({ error: "No such board" });
        }

        return res.status(200).json(board);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Create Board
const createBoard = async (req, res) => {
    const {
        boardName,
        ownerName,
        ownerEmail,
        projectId
    } = req.body;

    try {
        const boardAccess = {};
        boardAccess[ownerEmail] = ['room:write'];

        const board = await Board.create({
            boardName,
            ownerName,
            ownerEmail,
            usersAccesses: boardAccess,
            ...(projectId && { projectId })
        });

        return res.status(200).json(board);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// Update Board
const updateBoard = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such board" });
    }

    try {
        // const board = await Board.findByIdAndUpdate(id, req.body, { new: true });
        const board = await Board.findByIdAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        )

        if (!board) {
            return res.status(404).json({ error: "No such board" });
        }

        return res.status(200).json(board);
    } catch (error) {
        return res.status(500).json({ error: "Error updating board" });
    }
}

// Delete Board
const deleteBoard = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such board" });
    }

    const board = await Board.findOneAndDelete({ _id: id });

    if (!board) {
        return res.status(404).json({ error: "No such board" });
    }

    return res.status(200).json(board);
}

module.exports = {
    getAllBoards,
    getSingleBoard,
    createBoard,
    updateBoard,
    deleteBoard
}