const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' }
}, { timestamps: true });

module.exports = mongoose.model('Label', labelSchema);
