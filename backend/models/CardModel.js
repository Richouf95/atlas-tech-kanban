const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: { type: String, required: true },
    index: { type: Number, required: true },
    columnId: { type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    label: { type: mongoose.Schema.Types.ObjectId, ref: 'Label' },
    assigned: { type: String },
    dueDate: { type: Date },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
