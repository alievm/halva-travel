const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true },
  name: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  description: {
    ru: String,
    en: String,
    uz: String
  },
  stars: Number,
  images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
