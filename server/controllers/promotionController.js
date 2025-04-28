const Promotion = require('../models/Promotion');

// 🔹 Получить все акции
exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find({ isActive: true });
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Создать новую акцию
exports.createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 Обновить акцию
exports.updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json(promotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 Удалить акцию
exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json({ message: 'Promotion deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
