const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Alert = sequelize.define('Alert', {
  type: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  lat: { type: DataTypes.FLOAT },
  lng: { type: DataTypes.FLOAT },
  severity: { type: DataTypes.ENUM('info', 'warning', 'critical'), defaultValue: 'info' },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: true
});

module.exports = Alert;
