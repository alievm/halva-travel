const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  content: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  image: { type: String },
  isActive: { type: Boolean, default: true },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  }
}, { timestamps: true });

newsSchema.pre('save', function (next) {
  if (!this.slug && this.title?.en) {
    this.slug = this.title.en
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/\-+/g, '-')
      .replace(/^\-+|\-+$/g, '');
  }
  next();
});

module.exports = mongoose.model('News', newsSchema);