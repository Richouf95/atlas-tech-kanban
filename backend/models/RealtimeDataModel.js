const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const liveObjectSchema = new Schema({
    liveblocksType: { type: String, required: true },
    data: mongoose.Schema.Types.Mixed // Permet de stocker des données flexibles comme LiveObject, LiveList
}, { _id: false });

const realtimeDataSchema = new Schema({
    roomId: { type: String, required: true }, // Associe les données à une room spécifique
    columns: [liveObjectSchema],
    labels: [liveObjectSchema],
    cards: [liveObjectSchema]
}, { timestamps: true });

module.exports = mongoose.model('RealtimeData', realtimeDataSchema);
