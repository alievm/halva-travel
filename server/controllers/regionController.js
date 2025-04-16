const Region = require('../models/Region');
const { getWeatherByRegionName } = require('../services/weatherService');

exports.createRegion = async (req, res) => {
  try {
    const { name, description } = req.body;
    const weather = await getWeatherByRegionName(name.en);
    const region = new Region({ name, description, weather });
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

    // Получаем текущий регион
    const existingRegion = await Region.findById(req.params.id);
    if (!existingRegion) {
      return res.status(404).json({ error: 'Регион не найден' });
    }

    // Если поменяли название на английском — обновим погоду
    let weather = existingRegion.weather;
    if (name?.en && name.en !== existingRegion.name.en) {
      const updatedWeather = await getWeatherByRegionName(name.en);
      if (updatedWeather) weather = updatedWeather;
    }

    const updatedRegion = await Region.findByIdAndUpdate(
      req.params.id,
      { name, description, weather },
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
