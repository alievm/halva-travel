const Hotel = require('../models/Hotel');

exports.createHotel = async (req, res) => {
  try {
    const { name, region, description, stars } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];

    const hotel = new Hotel({
      name: JSON.parse(name),
      description: description ? JSON.parse(description) : {},
      stars,
      region,
      images,
    });

    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('region');
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('region');
    res.json(hotel);
  } catch (err) {
    res.status(404).json({ error: 'Hotel not found' });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const { name, region, description, stars } = req.body;
    const existingImages = JSON.parse(req.body.existingImages || '[]');
    const newImages = req.files ? req.files.map(file => file.filename) : [];

    const updateData = {
      name: JSON.parse(name),
      description: description ? JSON.parse(description) : {},
      stars,
      region,
      images: [...existingImages, ...newImages], // Собираем все: оставшиеся + новые
    };

    const hotel = await Hotel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hotel deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
