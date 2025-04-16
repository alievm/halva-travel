const Tour = require('../models/Tour');
const fs = require('fs');
const path = require('path');

exports.createTour = async (req, res) => {
  try {
    const imagePaths = req.files?.map(file => `tours/${file.filename}`) || [];

    const parsedFields = {};
    const jsonFields = ['title', 'route', 'shortDescription', 'includes', 'extras'];
    jsonFields.forEach(field => {
      if (req.body[field]) {
        try {
          parsedFields[field] = JSON.parse(req.body[field]);
        } catch (e) {
          console.warn(`Cannot parse field "${field}":`, e.message);
        }
      }
    });

    const tour = new Tour({
      ...req.body,
      ...parsedFields,
      images: imagePaths,
      nights: req.body.days > 0 ? req.body.days - 1 : 0
    });

    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find().populate('region hotel');
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('region hotel');
    if (!tour) return res.status(404).json({ error: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(404).json({ error: 'Tour not found' });
  }
};

exports.getTourBySlug = async (req, res) => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug }).populate('region hotel');
    if (!tour) return res.status(404).json({ error: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const existingTour = await Tour.findById(req.params.id);
    if (!existingTour) return res.status(404).json({ error: 'Tour not found' });

    const updatedData = { ...req.body };

    const jsonFields = ['title', 'route', 'shortDescription', 'includes', 'extras', 'existingImages'];
    jsonFields.forEach(field => {
      if (updatedData[field] && typeof updatedData[field] === 'string') {
        try {
          updatedData[field] = JSON.parse(updatedData[field]);
        } catch (e) {
          console.warn(`Cannot parse field "${field}":`, e.message);
        }
      }
    });

    // Удалённые изображения не попадут в existingImages, поэтому сохраняем только их
    const remainingImages = updatedData.existingImages || [];
    const newImages = req.files?.map(file => `tours/${file.filename}`) || [];
    updatedData.images = [...remainingImages, ...newImages];
    delete updatedData.existingImages;

    // Обновим nights автоматически при изменении days
    if (updatedData.days) {
      updatedData.nights = updatedData.days > 0 ? updatedData.days - 1 : 0;
    }

    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedTour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: 'Tour not found' });

    // Удаление файлов изображений с диска (опционально)
    tour.images.forEach((imgPath) => {
      const fullPath = path.join(__dirname, '..', 'uploads', imgPath);
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
          if (err) console.warn('Ошибка при удалении изображения:', err.message);
        });
      }
    });

    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tour deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};