const sequelize = require('../config/sequelize');
const { User, Vessel, PFZ, Alert, Species } = require('../models_sql');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: __dirname + '/../.env' });

const seed = async () => {
  await sequelize.sync({ force: true });

  await User.create({ username: 'admin', email: 'admin@deepblue.com', password: await bcrypt.hash('admin123', 10), role: 'admin' });
  await Vessel.bulkCreate([
    { lat: 12.34, lng: 45.67, confidence: 98, status: 'Active' },
    { lat: 13.78, lng: 46.24, confidence: 92, status: 'Active' },
    { lat: 12.91, lng: 45.12, confidence: 87, status: 'Anchored' },
    { lat: 13.45, lng: 46.88, confidence: 96, status: 'Active' }
  ]);
  await PFZ.bulkCreate([
    { name: 'PFZ-1', coordinates: JSON.stringify([{ lat: 12.3, lng: 45.6 }]), area: 120, status: 'Open' },
    { name: 'PFZ-2', coordinates: JSON.stringify([{ lat: 13.1, lng: 46.2 }]), area: 90, status: 'Closed' }
  ]);
  await Alert.bulkCreate([
    { type: 'vessel', title: 'Unauthorized vessel in protected zone', description: 'A vessel entered PFZ-12', lat: 12.3, lng: 45.6, severity: 'critical' },
    { type: 'vessel', title: 'Unidentified vessel detected', description: 'Unknown vessel detected', lat: 12.3, lng: 45.6, severity: 'warning' },
    { type: 'species', title: 'New species sighting reported', description: 'Dolphin sighted', lat: 13.0, lng: 46.0, severity: 'info' }
  ]);
  await Species.bulkCreate([
    { name: 'Bluefin Tuna', type: 'Fish', conservationStatus: 'Endangered', sightings: 10 },
    { name: 'Great White Shark', type: 'Fish', conservationStatus: 'Endangered', sightings: 2 },
    { name: 'Bottlenose Dolphin', type: 'Mammal', conservationStatus: 'Least Concern', sightings: 5 },
    { name: 'Humpback Whale', type: 'Mammal', conservationStatus: 'Vulnerable', sightings: 1 },
    { name: 'Leatherback Turtle', type: 'Reptile', conservationStatus: 'Endangered', sightings: 3 }
  ]);
  console.log('Sample data seeded!');
  process.exit();
};

seed();
