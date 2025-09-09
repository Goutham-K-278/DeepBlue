const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Species = sequelize.define('Species', {
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  conservationStatus: { type: DataTypes.STRING },
  sightings: { type: DataTypes.INTEGER }
}, {
  timestamps: true
});

module.exports = Species;
