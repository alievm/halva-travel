const ContactRequest = require('../models/ContactRequest');

exports.createContactRequest = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и номер телефона обязательны.' });
    }

    const newRequest = new ContactRequest({ name, phone, message });
    await newRequest.save();

    res.status(201).json({ message: 'Заявка успешно отправлена!' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

exports.getAllContactRequests = async (req, res) => {
  try {
    const requests = await ContactRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении заявок.' });
  }
};
