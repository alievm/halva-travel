const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  answer: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Faq', faqSchema);
