const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const discountController = require('../controllers/discountController');
const createUploader = require('../middlewares/upload');

const uploadTours = createUploader('tours');

// 🔹 Получить ранние бронирования
router.get('/early-booking', discountController.getEarlyBookingTours);

// 🔹 Получить все спецпредложения
router.get('/special-offers', discountController.getSpecialOffers);

// 🔹 Получить тур по слагу
router.get('/slug/:slug', tourController.getTourBySlug);

// 🔹 CRUD маршруты
router.get('/', tourController.getTours);
router.post('/', uploadTours.array('images', 10), tourController.createTour);
router.get('/:id', tourController.getTour);
router.put('/:id', uploadTours.array('images', 10), tourController.updateTour);
router.delete('/:id', tourController.deleteTour);

module.exports = router;
