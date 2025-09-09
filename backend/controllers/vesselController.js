const Vessel = require('../models/Vessel');

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const vessels = await Vessel.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Vessel.countDocuments();
    res.json({ vessels, total });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const vessel = new Vessel(req.body);
    await vessel.save();
    res.status(201).json(vessel);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const count = await Vessel.countDocuments();
    const active = await Vessel.countDocuments({ status: 'Active' });
    res.json({ count, active });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const vessel = await Vessel.findById(req.params.id);
    if (!vessel) return res.status(404).json({ message: 'Vessel not found' });
    res.json(vessel);
  } catch (err) {
    next(err);
  }
};
