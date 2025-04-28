const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  subtitle: {
    ru: { type: String },
    en: { type: String },
    uz: { type: String }
  },
  cta: {
    ru: { type: String },
    en: { type: String },
    uz: { type: String }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Banner', bannerSchema);
