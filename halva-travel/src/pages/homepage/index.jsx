import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useTranslation } from 'react-i18next';
import CarouselHeader from '../../components/carousel-header';
import { motion } from "framer-motion";
import TourCard from '../../components/tour-card';
import NewsSection from '../../components/news-section';
import TravelCarousel from '../../components/carousel';
import PartnerLogosMarquee from '../../components/partners-marquee';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios.get('/tours')
      .then(res => setTours(res.data))
      .catch(err => console.error('Ошибка при загрузке туров:', err));
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    }),
  };

  return (
    <div>
      <div className='carousel-bg'>
        <CarouselHeader />
      </div>

      <div className='bg-[#A88856]/10 py-12'>
        <h2 className='max-w-screen-2xl mx-auto uppercase text-3xl font-bold mb-2'>
        {t('recommendedTours')}
        </h2>

        <div className="max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-auto p-4">
          {tours.slice(0, 8).map((tour, i) => (
            <motion.div
              key={tour._id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUpVariant}
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </div>

        <TravelCarousel />

        <h2 className='max-w-screen-2xl mx-auto uppercase text-3xl font-bold mt-8 mb-2'>
        {t('travelNow')}
        </h2>

        {/* Фильтры по городам можно сделать позже */}

        <div className="max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-auto p-4">
          {tours.map((tour, i) => (
            <motion.div
              key={tour._id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUpVariant}
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </div>

        <div className='bg-white'>
          <NewsSection />
          <h2 className="text-3xl max-w-screen-2xl mx-auto font-bold mb-4">
          {t('trustedBy')}
            <div className="w-40 h-[4px] bg-[#DFAF68] mt-2" />
          </h2>
          <PartnerLogosMarquee />
        </div>
      </div>
    </div>
  );
};

export default Home;
