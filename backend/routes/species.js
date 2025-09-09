const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAll,
  create,
  getById,
  getStats
} = require('../controllers/speciesController');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.get('/:id', auth, getById);
router.get('/stats', auth, getStats);

module.exports = router;
