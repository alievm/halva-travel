import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "../../api/axiosConfig";
import { BellRing, PhoneCall } from "lucide-react";

const TourCard = ({ tour }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "ru";
  const [hovered, setHovered] = useState(false);
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [form] = Form.useForm();
  const [bookingLoading, setBookingLoading] = useState(false);

  const img = tour.images?.[0]
    ? `${import.meta.env.VITE_DIRECTORY_URL || "http://localhost:5000"}/uploads/${tour.images[0]}`
    : "/placeholder.jpg";

  const handleBooking = async (values) => {
    setBookingLoading(true);
    try {
      await axios.post("/bookings", { ...values, tour: tour._id });
      message.success(t("bookingSuccess"));
      form.resetFields();
      setIsBookingVisible(false);
    } catch (err) {
      message.error(t("bookingError"));
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="max-w-[330px] relative rounded-[20px] p-[8px] overflow-hidden bg-white transform-gpu">
      <div className="relative">
        <img
          src={img}
          alt="Resort"
          className="w-full h-44 object-cover rounded-[12px]"
        />

        <button
          onClick={() => setIsBookingVisible(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="absolute cursor-pointer bottom-4 right-4 bg-[#DFAF68] text-white text-[12px] font-medium p-2 rounded-[10px] h-[40px] w-[150px] flex items-center justify-center transition-colors duration-300"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={hovered ? "open" : "contact"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute flex items-center gap-2"
            >
              {hovered ? (
                <>
                  <BellRing size={18} /> {t("bookTour")}
                </>
              ) : (
                <>
                  <PhoneCall size={18} /> {t("contact")}
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <div className="p-4 antialiased text-[0]">
        <div className="text-gray-500 text-xs flex items-center gap-1 mb-1">
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path
              d="M12.8334 5.66683C12.8334 9.72673 8.50002 14.6668 8.50002 14.6668C8.50002 14.6668 4.16669 9.72673 4.16669 5.66683C4.16669 3.2736 6.10679 1.3335 8.50002 1.3335C10.8933 1.3335 12.8334 3.2736 12.8334 5.66683Z"
              stroke="#535353"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
            <ellipse
              cx="8.5"
              cy="5.66699"
              rx="2"
              ry="2"
              stroke="#535353"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>
          <span>{tour.region?.name?.[lang]}</span>
        </div>
        <h3 className="text-md font-semibold leading-5 mb-1 uppercase">
          <Link to={`/tours/${tour.slug}`} className="hover:text-[#DFAF68] hover:underline">
            {tour.title?.[lang]}
          </Link>
        </h3>
        <div className="mb-1 mt-3">
          <div className="text-xs text-gray-500">{t("priceFrom")}</div>
        </div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-xl font-semibold text-[#DFAF68]">
            {tour.price} $
          </div>
          <div className="text-xs flex items-center gap-2 text-gray-600">
            <svg width="20" height="20" fill="none">
              <path
                fill="#535353"
                fillRule="evenodd"
                d="M10 4.375c.345 0 .625.28.625.625v4.375H15a.625.625 0 1 1 0 1.25h-5A.625.625 0 0 1 9.375 10V5c0-.345.28-.625.625-.625Z"
              />
              <path
                fill="#535353"
                fillRule="evenodd"
                d="M10 2.292a7.708 7.708 0 1 0 0 15.416 7.708 7.708 0 0 0 0-15.416ZM1.042 10a8.958 8.958 0 1 1 17.916 0 8.958 8.958 0 0 1-17.916 0Z"
              />
            </svg>
            <span>{t("daysNights", { days: tour.days, nights: tour.nights })}</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isBookingVisible && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6"
            >
              <h2 className="text-xl font-semibold mb-4">{t("bookTour")}</h2>
              <Form layout="vertical" form={form} onFinish={handleBooking}>
                <Form.Item
                  label={t("yourName")}
                  name="name"
                  rules={[{ required: true, message: t("enterName") }]}
                >
                  <Input placeholder={t("yourName")} size="large" />
                </Form.Item>
                <Form.Item
                  label={t("phoneTitle")}
                  name="phone"
                  rules={[{ required: true, message: t("enterPhone") }]}
                >
                  <Input placeholder="+998..." size="large" />
                </Form.Item>
                <div className="flex justify-end gap-3 mt-4">
                  <Button block onClick={() => setIsBookingVisible(false)}>
                    {t("cancel")}
                  </Button>
                  <Button block type="primary" htmlType="submit" loading={bookingLoading}>
                    {t("submit")}
                  </Button>
                </div>
              </Form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TourCard;
