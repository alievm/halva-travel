import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from '../api/axiosConfig';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/contact', formData);
      toast.success('Спасибо! Мы свяжемся с вами.');
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      toast.error('Ошибка при отправке. Попробуйте позже.');
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      {/* Видео фон */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/video.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {/* Затемнение поверх видео */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-10" />

      {/* Контент поверх видео */}
      <div className="relative z-20 w-full max-w-screen-2xl mx-auto py-12 px-6 text-white">
        
        {/* Заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Свяжитесь с нами
        </motion.h1>

        {/* Контактная информация */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-8 mb-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800"
        >
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Телефоны</h2>
            <p>+998 90 123 45 67</p>
            <p>+998 99 765 43 21</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Email</h2>
            <p>info@yourtravel.com</p>
            <p>support@yourtravel.com</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Адрес</h2>
            <p>г. Ташкент, улица Истикбол, 25</p>
          </div>
        </motion.div>

        {/* Форма обратной связи */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-3xl mx-auto text-gray-800"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Отправить запрос</h2>
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DFAF68]"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+998 90 123 45 67"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DFAF68]"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ваш вопрос"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DFAF68]"
              rows="4"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#DFAF68] hover:bg-[#c59b56] text-white font-medium py-2 rounded-xl transition"
            >
              Отправить
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
