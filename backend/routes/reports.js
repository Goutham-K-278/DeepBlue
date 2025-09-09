const router = require('express').Router();
const auth = require('../middleware/auth');
const { weekly, analytics } = require('../controllers/reportController');

router.get('/weekly', auth, weekly);
router.get('/analytics', auth, analytics);

module.exports = router;
