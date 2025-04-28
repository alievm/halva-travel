const Tour = require('../models/Tour');
const fs = require('fs');
const path = require('path');

exports.createTour = async (req, res) => {
  try {
    const imagePaths = req.files?.map(file => `tours/${file.filename}`) || [];

    const parsedFields = {};
    const jsonFields = ['title', 'route', 'shortDescription', 'includes', 'extras', 'discounts']; // 👈 добавил discounts
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
    const {
      region,
      hotel,
      isActive,
      minPrice,
      maxPrice,
      minDays,
      maxDays,
      minNights,
      maxNights,
      includes,
      extras,
      search,
      titleLang = 'en',
      weather, // если добавишь в модель
      createdAfter,
      createdBefore,
      updatedAfter,
      updatedBefore
    } = req.query;

    const query = {};

    // 🔹 Регион и отель
    if (region) query.region = region;
    if (hotel) query.hotel = hotel;

    // 🔹 Активность
    if (typeof isActive !== 'undefined') {
      query.isActive = isActive === 'true';
    }

    // 🔹 Цена
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 🔹 Дни
    if (minDays || maxDays) {
      query.days = {};
      if (minDays) query.days.$gte = Number(minDays);
      if (maxDays) query.days.$lte = Number(maxDays);
    }

    // 🔹 Ночи
    if (minNights || maxNights) {
      query.nights = {};
      if (minNights) query.nights.$gte = Number(minNights);
      if (maxNights) query.nights.$lte = Number(maxNights);
    }

    // 🔹 Включенные опции
    if (includes) {
      const arr = Array.isArray(includes) ? includes : includes.split(',');
      query.includes = { $all: arr };
    }

    // 🔹 Extras: поиск по ключевым словам (во всех языках)
    if (extras) {
      query.$or = [
        { 'extras.en': { $regex: extras, $options: 'i' } },
        { 'extras.ru': { $regex: extras, $options: 'i' } },
        { 'extras.uz': { $regex: extras, $options: 'i' } }
      ];
    }

    // 🔹 Название тура (по нужному языку)
    if (search && ['en', 'ru', 'uz'].includes(titleLang)) {
      query[`title.${titleLang}`] = { $regex: search, $options: 'i' };
    }

    // 🔹 Погода (если ты добавишь поле `weather` в модель)
    if (weather) {
      query.weather = { $regex: weather, $options: 'i' };
    }

    // 🔹 Фильтрация по дате создания
    if (createdAfter || createdBefore) {
      query.createdAt = {};
      if (createdAfter) query.createdAt.$gte = new Date(createdAfter);
      if (createdBefore) query.createdAt.$lte = new Date(createdBefore);
    }

    // 🔹 Фильтрация по дате обновления
    if (updatedAfter || updatedBefore) {
      query.updatedAt = {};
      if (updatedAfter) query.updatedAt.$gte = new Date(updatedAfter);
      if (updatedBefore) query.updatedAt.$lte = new Date(updatedBefore);
    }

    const tours = await Tour.find(query).populate('region hotel');
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

    const jsonFields = ['title', 'route', 'shortDescription', 'includes', 'extras', 'discounts', 'existingImages']; // 👈 тоже добавил discounts
    jsonFields.forEach(field => {
      if (updatedData[field] && typeof updatedData[field] === 'string') {
        try {
          updatedData[field] = JSON.parse(updatedData[field]);
        } catch (e) {
          console.warn(`Cannot parse field "${field}":`, e.message);
        }
      }
    });

    const remainingImages = updatedData.existingImages || [];
    const newImages = req.files?.map(file => `tours/${file.filename}`) || [];
    updatedData.images = [...remainingImages, ...newImages];
    delete updatedData.existingImages;

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