const Species = require('../models/Species');

exports.getAll = async (req, res, next) => {
  try {
    const species = await Species.find();
    res.json(species);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const species = new Species(req.body);
    await species.save();
    res.status(201).json(species);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) return res.status(404).json({ message: 'Species not found' });
    res.json(species);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const count = await Species.countDocuments();
    const endangered = await Species.countDocuments({ conservationStatus: /endangered/i });
    res.json({ count, endangered });
  } catch (err) {
    next(err);
  }
};
