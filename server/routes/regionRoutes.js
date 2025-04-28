const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController');
const createUploader = require('../middlewares/upload');

const uploadTours = createUploader('tours');

router.get('/', regionController.getRegions);
router.post('/', uploadTours.array('images'), regionController.createRegion); // ⬅ Добавлено upload
router.get('/:id', regionController.getRegion);
router.put('/:id', uploadTours.array('images'), regionController.updateRegion); // ⬅ Добавлено upload
router.delete('/:id', regionController.deleteRegion);

module.exports = router;
