const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAll,
  create,
  getStats,
  getById
} = require('../controllers/vesselController');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.get('/stats', auth, getStats);
router.get('/:id', auth, getById);

module.exports = router;
