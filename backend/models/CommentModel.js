const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    type: { type: String, default: 'comment' },
    threadId: { type: String, required: true },
    roomId: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    reactions: { type: [String], default: [] },
    attachments: { type: [String], default: [] },
    body: {
        version: { type: Number, required: true },
        content: mongoose.Schema.Types.Mixed // Peut inclure des textes, des paragraphes, etc.
    }
}, { _id: false });

const threadSchema = new Schema({
    type: { type: String, default: 'thread' },
    id: { type: String, required: true, unique: true },
    roomId: { type: String, required: true },
    comments: [commentSchema],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date },
    metadata: mongoose.Schema.Types.Mixed,
    resolved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Thread', threadSchema);
