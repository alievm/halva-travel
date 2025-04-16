import React from 'react';
import { FaMapMarkerAlt, FaWifi, FaTv, FaSwimmingPool, FaCar, FaUmbrellaBeach } from 'react-icons/fa';

const TourInfoCard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">CLUB HOTEL SERA</h1>
      <div className="flex items-center mt-2 text-yellow-500">
        {'★★★★★'}
      </div>
      <p className="text-gray-600 flex items-center mt-1">
        <FaMapMarkerAlt className="mr-1" />
        Турция, Анталья (Lara)
      </p>
      <div className="flex flex-wrap gap-4 mt-3 text-gray-700 text-sm">
        <FaWifi title="Wi-Fi" />
        <FaTv title="Телевизор" />
        <FaSwimmingPool title="Бассейн" />
        <FaCar title="Трансфер" />
        <FaUmbrellaBeach title="Пляж" />
        <span>9 км</span>
        <span>10 м</span>
        <span>Песчаный пляж</span>
      </div>
      <img
        src="/images/hotel_main.jpg" // путь к изображению
        alt="Club Hotel Sera"
        className="rounded-lg mt-4 w-full"
      />
    </div>
  );
};

export default TourInfoCard;
