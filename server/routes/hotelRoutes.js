const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const createUploader = require('../middlewares/upload');

const uploadHotels = createUploader('hotels');

router.get('/', hotelController.getHotels);
router.post('/', uploadHotels.array('images', 5), hotelController.createHotel);
router.get('/:id', hotelController.getHotel);
router.put('/:id', uploadHotels.array('images', 5), hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;