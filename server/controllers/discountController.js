const Tour = require('../models/Tour');

// 🔥 Получить только туры с активной скидкой "early_booking"
exports.getEarlyBookingTours = async (req, res) => {
  try {
    const today = new Date();
    const tours = await Tour.find({
      'discounts.type': 'early_booking',
      'discounts.validUntil': { $gte: today },
      isActive: true
    }).populate('region hotel');

    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 Получить все туры с любыми активными скидками
exports.getSpecialOffers = async (req, res) => {
  try {
    const today = new Date();
    const tours = await Tour.find({
      'discounts.validUntil': { $gte: today },
      isActive: true
    }).populate('region hotel');

    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
