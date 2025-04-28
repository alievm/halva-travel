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
    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${tour.images[0]}`
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
    <div className="max-w-[330px] mx-auto relative rounded-[20px] p-[8px] overflow-hidden bg-white transform-gpu">
      <div className="relative">
      <img
  src={img}
  alt="Resort"
  className="w-full h-44 object-cover rounded-[12px] transition-transform duration-300 ease-in-out will-change-transform"
  loading="lazy"
  decoding="async"
/>
<div className="text-gray-500  absolute top-3 left-3 bg-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 mb-1">
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path
              d="M12.8334 5.66683C12.8334 9.72673 8.50002 14.6668 8.50002 14.6668C8.50002 14.6668 4.16669 9.72673 4.16669 5.66683C4.16669 3.2736 6.10679 1.3335 8.50002 1.3335C10.8933 1.3335 12.8334 3.2736 12.8334 5.66683Z"
              stroke="#A88856"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
            <ellipse
              cx="8.5"
              cy="5.66699"
              rx="2"
              ry="2"
              stroke="#A88856"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-medium text-xs text-[#A88856]">{tour.region?.name?.[lang]}</span>
        </div>
        {/* <button
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
        </button> */}
      </div>

      <div className="p-4 antialiased text-[0]">
        
        <h3 className="text-md font-semibold leading-5 mb-3 uppercase">
          <Link to={`/tours/${tour.slug}`} className="hover:text-[#DFAF68] hover:underline">
            {tour.title?.[lang]}
          </Link>
        </h3>
      
        <div className="flex items-start flex-col-reverse justify-between mb-1">
        <div className="mb-1 mt-3">
          <div className="text-xs text-gray-500">{t("priceFrom")}</div>
          <div className="text-2xl font-semibold  text-[#A88856] tracking-tight">
  {tour.price?.toLocaleString()} <span className="text-sm font-light opacity-80">$ / чел</span>
</div>
        </div>

      
         <div className="flex-col flex gap-2">
         <div className="text-xs flex items-center gap-2 text-gray-600">
         <div className="tours-info__ico">
         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="5.83337" y="1.6665" width="8.33333" height="2.5" stroke="#A88856" stroke-linejoin="round"/>
<path d="M8.75 15H11.25V18.3333H8.75V15Z" stroke="#A88856" stroke-linejoin="round"/>
<path d="M5 6.6665H15V18.3332H5V10.8332V6.6665Z" stroke="#A88856" stroke-linejoin="round"/>
<path d="M7.5 6.6665V4.1665" stroke="#A88856" stroke-linejoin="round"/>
<path d="M12.5 6.6665V4.1665" stroke="#A88856" stroke-linejoin="round"/>
<path d="M7.08337 9.58301H8.75004" stroke="#A88856" stroke-linejoin="round"/>
<path d="M7.08337 12.5H8.75004" stroke="#A88856" stroke-linejoin="round"/>
<path d="M11.25 9.58301H12.9167" stroke="#A88856" stroke-linejoin="round"/>
<path d="M11.25 12.5H12.9167" stroke="#A88856" stroke-linejoin="round"/>
</svg>
</div>

            <span>{tour.hotel?.name[lang]}, {tour.region?.name?.[lang]}</span>
          </div>
         <div className="text-xs flex items-center gap-2 text-gray-600">
         <div className="tours-info__ico">
         <svg width="20" height="20" fill="none">
              <path
                fill="#A88856"
                fillRule="evenodd"
                d="M10 4.375c.345 0 .625.28.625.625v4.375H15a.625.625 0 1 1 0 1.25h-5A.625.625 0 0 1 9.375 10V5c0-.345.28-.625.625-.625Z"
              />
              <path
                fill="#A88856"
                fillRule="evenodd"
                d="M10 2.292a7.708 7.708 0 1 0 0 15.416 7.708 7.708 0 0 0 0-15.416ZM1.042 10a8.958 8.958 0 1 1 17.916 0 8.958 8.958 0 0 1-17.916 0Z"
              />
            </svg>
         </div>
            <span>{t("daysNights", { days: tour.days, nights: tour.nights })}</span>
          </div>
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
      <Link
  to={`/tours/${tour.slug}`}
  className="mt-2 mx-auto flex justify-between items-center bg-[#f4f0ed] border border-transparent rounded-full px-6 py-2 w-full hover:bg-white hover:border-[#F3EFED] transition-all duration-300 group"
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
</Link>
      </AnimatePresence>
    </div>
  );
};

export default TourCard;
