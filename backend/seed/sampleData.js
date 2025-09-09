const mongoose = require('mongoose');
const User = require('../models/User');
const Vessel = require('../models/Vessel');
const PFZ = require('../models/PFZ');
const Alert = require('../models/Alert');
const Species = require('../models/Species');
require('dotenv').config({ path: __dirname + '/../.env' });

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
  await Vessel.deleteMany();
  await PFZ.deleteMany();
  await Alert.deleteMany();
  await Species.deleteMany();

  await User.create({ username: 'admin', email: 'admin@deepblue.com', password: 'admin123', role: 'admin' });
  await Vessel.create([
    { location: { lat: 12.34, lng: 45.67 }, confidence: 98, status: 'Active' },
    { location: { lat: 13.78, lng: 46.24 }, confidence: 92, status: 'Active' },
    { location: { lat: 12.91, lng: 45.12 }, confidence: 87, status: 'Anchored' },
    { location: { lat: 13.45, lng: 46.88 }, confidence: 96, status: 'Active' }
  ]);
  await PFZ.create([
    { name: 'PFZ-1', coordinates: [{ lat: 12.3, lng: 45.6 }], area: 120, status: 'Open' },
    { name: 'PFZ-2', coordinates: [{ lat: 13.1, lng: 46.2 }], area: 90, status: 'Closed' }
  ]);
  await Alert.create([
    { type: 'vessel', title: 'Unauthorized vessel in protected zone', description: 'A vessel entered PFZ-12', location: { lat: 12.3, lng: 45.6 }, severity: 'critical' },
    { type: 'vessel', title: 'Unidentified vessel detected', description: 'Unknown vessel detected', location: { lat: 12.3, lng: 45.6 }, severity: 'warning' },
    { type: 'species', title: 'New species sighting reported', description: 'Dolphin sighted', location: { lat: 13.0, lng: 46.0 }, severity: 'info' }
  ]);
  await Species.create([
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
