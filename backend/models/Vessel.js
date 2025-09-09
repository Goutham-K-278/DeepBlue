const mongoose = require('mongoose');

const vesselSchema = new mongoose.Schema({
  location: {
    lat: Number,
    lng: Number
  },
  confidence: Number,
  status: { type: String, enum: ['Active', 'Anchored'], default: 'Active' },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Vessel', vesselSchema);
