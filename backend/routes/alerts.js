const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAll,
  create,
  update,
  getStats
} = require('../controllers/alertController');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.get('/stats', auth, getStats);

module.exports = router;
