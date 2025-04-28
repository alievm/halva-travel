// middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create directory if it doesn't exist
const bannersDir = path.join(__dirname, '../uploads/banners');
if (!fs.existsSync(bannersDir)) {
  fs.mkdirSync(bannersDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, bannersDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
