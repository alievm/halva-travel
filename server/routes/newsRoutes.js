const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const newsController = require('../controllers/newsController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/news');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', upload.single('image'), newsController.createNews);
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.put('/:id', upload.single('image'), newsController.updateNews);
router.get('/slug/:slug', newsController.getNewsBySlug);
router.delete('/:id', newsController.deleteNews);

module.exports = router;