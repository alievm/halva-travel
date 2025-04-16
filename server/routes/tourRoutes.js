const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const upload = require('../middlewares/upload');

router.get('/', tourController.getTours);
router.post('/', upload.array('images', 10), tourController.createTour);
router.get('/:id', tourController.getTour);
router.put('/:id', upload.array('images', 10), tourController.updateTour);
router.get('/slug/:slug', tourController.getTourBySlug);
router.delete('/:id', tourController.deleteTour);

module.exports = router;
