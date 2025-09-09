// ML Controller: Demo endpoints for ML modules

exports.shipDetection = (req, res) => {
  // Demo: Return mock ship detection results
  res.json({
    timestamp: Date.now(),
    vessels: [
      { id: 'VSL-4821', lat: 12.34, lng: 45.67, confidence: 0.98 },
      { id: 'VSL-3597', lat: 13.78, lng: 46.24, confidence: 0.95 }
    ]
  });
};

exports.optimization = (req, res) => {
  // Demo: Return mock optimization results
  res.json({
    bestRoute: ['Zone A', 'Zone B', 'Zone C'],
    fuelSaved: 12.5,
    timeSaved: 2.3
  });
};

exports.environmentalAnalysis = (req, res) => {
  // Demo: Return mock environmental/eDNA analysis
  res.json({
    eDNA: {
      detectedSpecies: ['Tuna', 'Dolphin', 'Shark'],
      rareSpecies: ['Blue Whale']
    },
    waterQuality: 'Good',
    temperature: 24.1
  });
};

exports.catchMorphometrics = (req, res) => {
  // Demo: Return mock catch morphometrics
  res.json({
    catches: [
      { species: 'Tuna', avgLength: 80, avgWeight: 15 },
      { species: 'Mackerel', avgLength: 30, avgWeight: 0.5 }
    ]
  });
};
