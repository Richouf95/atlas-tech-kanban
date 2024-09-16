const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnSchema = new Schema({
    name: { type: String, required: true },
    index: { type: Number, required: true },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Column', columnSchema);
