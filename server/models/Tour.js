const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tourSchema = new mongoose.Schema({
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: true,
    index: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    index: true
  },

  title: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },

  route: {
    ru: String,
    en: String,
    uz: String
  },

  shortDescription: {
    ru: String,
    en: String,
    uz: String
  },

  isActive: {
    type: Boolean,
    default: true
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },

  includes: {
    type: [String],
    enum: [
      'wifi', 'ac', 'breakfast', 'parking', 'pool',
      'heating', 'phone', 'safe', 'view', 'kids', 'gift'
    ],
    default: []
  },

  extras: {
    ru: String,
    en: String,
    uz: String
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  days: {
    type: Number,
    required: true,
    min: 1
  },

  nights: {
    type: Number,
    default: 0,
    min: 0
  },

  images: {
    type: [String],
    default: []
  }

}, { timestamps: true, versionKey: false });

// ✅ Автоматическая генерация slug (если не указан)
tourSchema.pre('save', function (next) {
  if (!this.isModified('slug') && !this.slug && this.title?.en) {
    const baseSlug = this.title.en
      .toLowerCase()
      .replace(/[\s\/\\]+/g, '-')     // пробелы и слэши → тире
      .replace(/[^\w\-]+/g, '')       // удалить спецсимволы
      .replace(/\-\-+/g, '-')         // двойные тире → одно
      .replace(/^-+|-+$/g, '');       // убрать тире с краёв

    this.slug = `${baseSlug}-${uuidv4().slice(0, 8)}`; // добавляем уникальность
  }
  next();
});

module.exports = mongoose.model('Tour', tourSchema);
