const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const upload = require('../middlewares/bannerUpload');

router.post('/', upload.single('image'), bannerController.createBanner);
router.put('/:id', upload.single('image'), bannerController.updateBanner);
router.get('/', bannerController.getBanners);
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;
