const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    trim: true
  }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
