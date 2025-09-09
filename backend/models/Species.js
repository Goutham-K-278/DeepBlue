const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  conservationStatus: String,
  sightings: Number
}, { timestamps: true });

module.exports = mongoose.model('Species', speciesSchema);
