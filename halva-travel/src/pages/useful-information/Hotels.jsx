import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import { useTranslation } from "react-i18next";
import PageLoader from "../../components/Loader";
import { Modal } from "antd";
import getAppLang from "../../utils/getAppLang";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Hotels = () => {
  const { t, i18n } = useTranslation();
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("/hotels");
        setHotels(res.data);
      } catch (error) {
        console.error("Ошибка загрузки отелей", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const openModal = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHotel(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <PageLoader isLoading={isLoading} />;
  }

  return (
    <div className="bg-[#A88856]/10">
      <div className="max-w-screen-2xl  mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{t("hotelsTitle") || "Отели"}</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            onClick={() => openModal(hotel)}
            className="rounded-xl overflow-hidden p-2  bg-white transition duration-300 cursor-pointer"
          >
            <img
              src={
                hotel.images && hotel.images.length > 0
                  ? `${baseURL}/uploads/hotels/${hotel.images[0]}`
                  : "/no-image.png"
              }
              alt={hotel.name[getAppLang(i18n.language)]}
              className="h-48 w-full rounded-xl object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {hotel.name[getAppLang(i18n.language)]}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3">
                {hotel.region?.description?.[getAppLang(i18n.language)]?.substring(0, 120)}...
              </p>

              <button   onClick={() => openModal(hotel)}
  className="mt-2 mx-auto flex cursor-pointer justify-between items-center bg-[#f4f0ed] border border-transparent rounded-full px-6 py-2 w-full hover:bg-white hover:border-[#F3EFED] transition-all duration-300 group"
>
  <span className="text-sm font-medium text-[#2b2b2b]">{t("more")}</span>
  <span className="ml-3 w-8 h-8 rounded-full bg-[#A88856] flex items-center justify-center transition-transform group-hover:rotate-90">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </span>
</button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно с информацией об отеле */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={closeModal}
        footer={null}
        width={800}
        title={selectedHotel?.name[getAppLang(i18n.language)]}
      >
        {selectedHotel && (
          <div>
            {/* Галерея картинок */}
            <div className="flex gap-2 overflow-x-auto pb-4">
              {selectedHotel.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`${baseURL}/uploads/hotels/${img}`}
                  alt={`Hotel ${idx}`}
                  className="h-40 rounded-md object-cover"
                />
              ))}
            </div>

            {/* Описание */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">{t("regionDescription") || "Описание региона"}</h3>
              <p className="text-gray-700 whitespace-pre-line">{selectedHotel.region?.description?.[getAppLang(getAppLang(i18n.language))]}</p>
            </div>

            {/* Погода */}
            {selectedHotel.region?.weather && (
              <div className="mt-6 flex items-center gap-4">
                <img src={selectedHotel.region.weather.icon} alt="weather-icon" className="w-10 h-10" />
                <div>
                  <p className="text-gray-600">{selectedHotel.region.weather.condition}</p>
                  <p className="font-semibold text-lg">{selectedHotel.region.weather.temp}°C</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
    </div>
  );
};

export default Hotels;
