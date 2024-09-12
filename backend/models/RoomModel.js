const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    id: { type: String, required: true, unique: true },
    type: { type: String, default: 'room' },
    lastConnectionAt: { type: Date },
    createdAt: { type: Date },
    metadata: {
        boardName: { type: String },
        projectId: { type: String },
        ownerName: { type: String },
        ownerEmail: { type: String },
        description: { type: String, default: 'N/A' }
    },
    defaultAccesses: { type: [String], default: [] },
    groupsAccesses: { type: Object, default: {} },
    usersAccesses: { type: Object, default: {} }
}, { timestamps: true })

module.exports = mongoose.model('Room', roomSchema);