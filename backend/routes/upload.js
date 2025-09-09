const router = require('express').Router();
const auth = require('../middleware/auth');
const { uploadMiddleware, handleUpload } = require('../controllers/uploadController');

router.post('/', auth, uploadMiddleware, handleUpload);

module.exports = router;
