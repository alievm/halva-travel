const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
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
  weather: {
    temp: Number,
    condition: String,
    icon: String
  },
  images: {
    type: [String], // массив строк
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Region', regionSchema);
