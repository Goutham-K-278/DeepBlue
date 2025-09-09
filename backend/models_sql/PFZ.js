const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const PFZ = sequelize.define('PFZ', {
  name: { type: DataTypes.STRING, allowNull: false },
  coordinates: { type: DataTypes.JSON }, // Array of {lat, lng}
  area: { type: DataTypes.FLOAT },
  status: { type: DataTypes.ENUM('Open', 'Closed'), defaultValue: 'Open' }
}, {
  timestamps: true
});

module.exports = PFZ;
