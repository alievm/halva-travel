const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { name, phone, tour } = req.body;
    const booking = await Booking.create({ name, phone, tour });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при бронировании' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('tour');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении заявок' });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка обновления статуса' });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Бронирование удалено' });
  } catch (err) {
    res.status(400).json({ error: 'Ошибка удаления' });
  }
};
