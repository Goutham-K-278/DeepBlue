const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: String,
  title: String,
  description: String,
  location: {
    lat: Number,
    lng: Number
  },
  severity: { type: String, enum: ['info', 'warning', 'critical'], default: 'info' },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
