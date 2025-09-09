const Alert = require('../models/Alert');

exports.getAll = async (req, res, next) => {
  try {
    const { severity, type } = req.query;
    const filter = {};
    if (severity) filter.severity = severity;
    if (type) filter.type = type;
    const alerts = await Alert.find(filter);
    res.json(alerts);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const count = await Alert.countDocuments();
    const critical = await Alert.countDocuments({ severity: 'critical' });
    res.json({ count, critical });
  } catch (err) {
    next(err);
  }
};
