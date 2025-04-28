const Banner = require('../models/Banner');
const fs = require('fs');
const path = require('path');

exports.createBanner = async (req, res) => {
    try {
      const { title, subtitle, cta, isActive } = req.body;
  
      const banner = new Banner({
        title: JSON.parse(title),
        subtitle: JSON.parse(subtitle),
        cta: JSON.parse(cta),
        isActive: isActive === 'true',
        image: req.file ? `banners/${req.file.filename}` : '',
      });
  
      await banner.save();
      res.status(201).json(banner);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.updateBanner = async (req, res) => {
    try {
      const bannerId = req.params.id;
      const existingBanner = await Banner.findById(bannerId);
      if (!existingBanner) {
        return res.status(404).json({ error: 'Banner not found' });
      }
  
      // Парсим мультиязычные поля
      const parsed = {};
      const jsonFields = ['title', 'subtitle', 'cta'];
      for (const field of jsonFields) {
        if (req.body[field]) {
          try {
            parsed[field] = JSON.parse(req.body[field]);
          } catch (err) {
            console.warn(`Cannot parse field ${field}:`, err.message);
          }
        }
      }
  
      // Если новое изображение — удалим старое
      if (req.file) {
        const oldPath = path.join(__dirname, '..', 'uploads', existingBanner.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
  
      const updated = {
        ...parsed,
        isActive: req.body.isActive === 'true',
      };
  
      if (req.file) {
        updated.image = `banners/${req.file.filename}`;
      }
  
      const banner = await Banner.findByIdAndUpdate(bannerId, updated, { new: true });
      res.json(banner);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ error: 'Banner not found' });
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
