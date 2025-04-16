const News = require('../models/News');
const path = require('path');

exports.createNews = async (req, res) => {
  try {
    const imagePath = req.file ? `news/${req.file.filename}` : null;

    const parsedFields = {};
    const fieldsToParse = ['title', 'content'];
    fieldsToParse.forEach(field => {
      if (req.body[field]) {
        try {
          parsedFields[field] = JSON.parse(req.body[field]);
        } catch (e) {
          console.warn(`Failed to parse ${field}`, e);
        }
      }
    });

    const news = new News({
      ...req.body,
      ...parsedFields,
      image: imagePath,
    });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) return res.status(404).json({ error: 'News not found' });
    res.json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: 'News not found' });
    res.json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const parsedFields = {};
    const fieldsToParse = ['title', 'content'];
    fieldsToParse.forEach(field => {
      if (req.body[field]) {
        try {
          parsedFields[field] = JSON.parse(req.body[field]);
        } catch (e) {
          console.warn(`Failed to parse ${field}`, e);
        }
      }
    });

    const updatedData = {
      ...req.body,
      ...parsedFields,
    };

    if (req.file) {
      updatedData.image = `news/${req.file.filename}`;
    }

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

