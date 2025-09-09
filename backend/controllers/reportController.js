exports.weekly = (req, res) => {
  // Generate a mock weekly report
  res.json({
    report: 'Weekly report generated',
    data: {
      vessels: 12,
      pfz: 5,
      alerts: 3,
      species: 42
    }
  });
};

exports.analytics = (req, res) => {
  // Return mock analytics data
  res.json({
    analytics: {
      vesselTrends: [10, 12, 11, 13, 12, 14, 12],
      alertTrends: [2, 3, 1, 4, 3, 2, 3],
      pfzUsage: [3, 4, 5, 5, 4, 5, 5],
      speciesSightings: [30, 32, 35, 38, 40, 41, 42]
    }
  });
};
