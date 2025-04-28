import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { motion } from 'framer-motion';
import axios from '../api/axiosConfig';
import 'antd/dist/reset.css'; // если ещё не подключал
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;

const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get('/faqs'); // твой API для получения FAQ
        setFaqs(res.data);
      } catch (err) {
        console.error('Ошибка загрузки FAQ:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) return null; // или показать скелетон, если хочешь

  return (
    <section className="bg-[#f9fafb] py-16 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        {t('faqPage.title')}
        </h2>

        <Collapse accordion className="bg-white rounded-2xl overflow-hidden">
          {faqs.map((faq) => (
            <Panel
              header={<span className="font-semibold">{faq.question.ru}</span>}
              key={faq._id}
              className="text-gray-700"
            >
              <p className="text-gray-600">{faq.answer.ru}</p>
            </Panel>
          ))}
        </Collapse>
      </motion.div>
    </section>
  );
};

export default FaqSection;
