// ML Routes: Endpoints for ML modules
const express = require('express');
const router = express.Router();
const mlController = require('../controllers/mlController');

router.get('/ship-detection', mlController.shipDetection);
router.get('/optimization', mlController.optimization);
router.get('/environmental', mlController.environmentalAnalysis);
router.get('/catch-morphometrics', mlController.catchMorphometrics);

module.exports = router;
