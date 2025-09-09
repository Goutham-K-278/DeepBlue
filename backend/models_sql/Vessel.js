const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Vessel = sequelize.define('Vessel', {
  lat: { type: DataTypes.FLOAT },
  lng: { type: DataTypes.FLOAT },
  confidence: { type: DataTypes.INTEGER },
  status: { type: DataTypes.ENUM('Active', 'Anchored'), defaultValue: 'Active' },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: true
});

module.exports = Vessel;
