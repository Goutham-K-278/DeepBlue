const PFZ = require('../models/PFZ');

exports.getAll = async (req, res, next) => {
  try {
    const pfzs = await PFZ.find();
    res.json(pfzs);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const pfz = new PFZ(req.body);
    await pfz.save();
    res.status(201).json(pfz);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const count = await PFZ.countDocuments();
    const open = await PFZ.countDocuments({ status: 'Open' });
    res.json({ count, open });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const pfz = await PFZ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pfz) return res.status(404).json({ message: 'PFZ not found' });
    res.json(pfz);
  } catch (err) {
    next(err);
  }
};
