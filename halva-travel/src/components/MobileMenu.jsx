import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileMenu = ({ t }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  const infoLinks = [
    { label: t("dropdown.about_uzbekistan"), href: "/about-uzbekistan" },
    { label: t("dropdown.cities"), href: "/cities" },
    { label: t("dropdown.hotels"), href: "/hotels" },
    { label: t("dropdown.transport"), href: "/transport" },
    { label: t("dropdown.must_know"), href: "/must-know" },
    { label: t("dropdown.culture"), href: "/culture" },
    { label: t("dropdown.cuisine"), href: "/cuisine" },
  ];

  const allLinks = [
    { label: t("aboutTitle"), href: "/about-us" },
    { label: t("tours"), href: "/tours" },
    ...infoLinks,
    { label: t("promotions"), href: "/early_booking" },
    { label: t("news"), href: "/news" },
    { label: "FAQ", href: "/faq" },
    { label: t("contacts"), href: "/contact" },
  ];

  const langLinks = [
    { label: "Русский", code: "ru", img: "/ru.svg" },
    { label: "English", code: "en", img: "/uk.svg" },
    { label: "O'zbekcha", code: "uz", img: "/uz.svg" },
  ];

  return (
    <div className="lg:hidden">
      {/* Кнопка открытия меню */}
      <button
        onClick={() => setMenuOpen(true)}
        className="p-2 focus:outline-none cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.25 5C2.25 4.58579 2.58579 4.25 3 4.25H21C21.4142 4.25 21.75 4.58579 21.75 5C21.75 5.41421 21.4142 5.75 21 5.75H3C2.58579 5.75 2.25 5.41421 2.25 5Z" fill="#535353" />
          <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12Z" fill="#535353" />
          <path fillRule="evenodd" clipRule="evenodd" d="M2.25 19C2.25 18.5858 2.58579 18.25 3 18.25H21C21.4142 18.25 21.75 18.5858 21.75 19C21.75 19.4142 21.4142 19.75 21 19.75H3C2.58579 19.75 2.25 19.4142 2.25 19Z" fill="#535353" />
        </svg>
      </button>

      {/* Меню */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Затемнение фона */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 bg-black backdrop-blur-md z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Главное меню */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-white flex flex-col justify-center p-6 space-y-8"
            >
              {/* Кнопка закрытия */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 cursor-pointer text-4xl font-bold text-gray-700 hover:text-gray-500 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path fill="#535353" fillRule="evenodd" d="M6.227 6.227a.75.75 0 0 1 1.06 0L12 10.939l4.712-4.712a.75.75 0 1 1 1.061 1.06L13.061 12l4.712 4.712a.75.75 0 0 1-1.06 1.061L12 13.061l-4.712 4.712a.75.75 0 1 1-1.06-1.06L10.938 12 6.227 7.288a.75.75 0 0 1 0-1.061Z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Ссылки */}
              <div className="flex flex-col space-y-6 text-left text-lg font-semibold">
                {allLinks.map((link, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-[#DFAF68] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Смена языка с флажками */}
              <div className="flex flex-col space-y-4 pt-8 border-t border-gray-200 mt-8 w-full">
                {langLinks.map((link, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                    onClick={() => {
                      i18n.changeLanguage(link.code);
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-600 hover:text-[#DFAF68] transition-colors text-sm"
                  >
                    <img src={link.img} alt={link.label} className="w-5 h-5" />
                    {link.label}
                  </motion.button>
                ))}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
