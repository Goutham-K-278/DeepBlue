const mongoose = require('mongoose');

const pfzSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: [{ lat: Number, lng: Number }],
  area: Number,
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('PFZ', pfzSchema);
