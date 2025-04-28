const Region = require('../models/Region');
const { getWeatherByRegionName } = require('../services/weatherService');

exports.createRegion = async (req, res) => {
  try {
    const { name, description } = req.body;
    const weather = await getWeatherByRegionName(JSON.parse(name).en); // так как это строка из form-data

    // Получение путей к загруженным файлам
    const imagePaths = req.files.map(file => `/uploads/tours/${file.filename}`);

    const region = new Region({
      name: JSON.parse(name),
      description: JSON.parse(description),
      weather,
      images: imagePaths
    });

    await region.save();
    res.status(201).json(region);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    res.json(region);
  } catch (err) {
    res.status(404).json({ error: 'Region not found' });
  }
};

exports.updateRegion = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingRegion = await Region.findById(req.params.id);
    if (!existingRegion) {
      return res.status(404).json({ error: 'Регион не найден' });
    }

    let parsedName = name ? JSON.parse(name) : existingRegion.name;
    let parsedDescription = description ? JSON.parse(description) : existingRegion.description;

    let weather = existingRegion.weather;
    if (parsedName.en && parsedName.en !== existingRegion.name.en) {
      const updatedWeather = await getWeatherByRegionName(parsedName.en);
      if (updatedWeather) weather = updatedWeather;
    }

    // Добавим новые изображения, если загружены
    const newImages = req.files?.map(file => `/uploads/tours/${file.filename}`) || [];
    const images = [...existingRegion.images, ...newImages];

    const updatedRegion = await Region.findByIdAndUpdate(
      req.params.id,
      {
        name: parsedName,
        description: parsedDescription,
        weather,
        images
      },
      { new: true }
    );

    res.json(updatedRegion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRegion = async (req, res) => {
  try {
    await Region.findByIdAndDelete(req.params.id);
    res.json({ message: 'Region deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
