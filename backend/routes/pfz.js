const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAll,
  create,
  getStats,
  update
} = require('../controllers/pfzController');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.get('/stats', auth, getStats);
router.put('/:id', auth, update);

module.exports = router;
