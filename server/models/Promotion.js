const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  description: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Promotion', promotionSchema);
