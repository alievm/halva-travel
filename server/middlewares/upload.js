const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createUploader(folderName) {
  const uploadDir = `uploads/${folderName}`;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
      cb(null, name);
    }
  });

  return multer({ storage });
}

module.exports = createUploader;
