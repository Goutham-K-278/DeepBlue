const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.single('image');

exports.handleUpload = (req, res) => {
  // Here you would process the image (e.g., ship detection)
  res.json({ message: 'Image uploaded', file: req.file });
};
