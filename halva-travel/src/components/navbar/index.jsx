import { AnimatePresence , motion} from 'framer-motion';
import { Phone } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import MobileMenu from '../MobileMenu';

const Navbar = () => {
  const [lang, setLang] = useState(false);
  const {t,  i18n } = useTranslation();

  const langLinks = [
    { label: "Русский", code: "ru", img: "/ru.svg" },
    { label: "English", code: "en", img: "/uk.svg" },
    { label: "O'zbekcha", code: "uz", img: "/uz.svg" },
  ];

  const currentLang = langLinks.find((l) => l.code === i18n.language) || langLinks[0];

  return (
    <div className='navbar'>
        <div className='navlist layout-container-limit mx-auto'>
            <img className='h-[76px]' src='/logo.svg' />

<div className='md:flex hidden items-center gap-10'>
<div className="sc-c933f06c-2 ceCamv">
  <div
    className="ant-space  css-1goufg3 ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small"
  >
   <div className="ant-space flex items-center css-1goufg3 ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small">
            <div className="ant-space-item">
             <Phone className='mr-2' color='#535353' strokeWidth={1.2} />
            </div>
            <div className="ant-space-item">
              <div className="departure-contact-phone">+998 (91) 411 11 11</div>
            </div>
          </div>
  </div>
  <a
    className="sc-f203a167-0 flex items-center eCgaQm where-to-buy left"
    aria-label="/where-to-buy"
    href="/where-to-buy"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      className=""
    >
      <path
        stroke="#535353"
        strokeLinejoin="round"
        d="M18.5 8.5C18.5 14.59 12 22 12 22S5.5 14.59 5.5 8.5a6.5 6.5 0 0 1 13 0Z"
        className=""
      ></path>
      <circle
        cx="12"
        cy="8.5"
        r="3"
        stroke="#535353"
        strokeLinejoin="round"
        className=""
      ></circle>
    </svg>
    {t("where_to_buy")}
  </a>
  <div className="sc-d8deed8b-0 hGnBaE relative">
    <button    onClick={() => setLang(!lang)} className="sc-f203a167-0 flex cursor-pointer  items-center gap-2 eCgaQm left" >
      <div className="sc-ae340dfe-0 flex items-center gap-2 dKKPmH">
      <img src={currentLang.img} alt={currentLang.label} className="w-5 h-5" />
    <span className="name">
      {currentLang.label}
    </span>
        <span role="img" className="anticon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M3 6L8 11L13 6"
              stroke="#535353"
              strokeLinejoin="round"
              className=""
            ></path>
          </svg>
        </span>
      </div>
    </button>

    <AnimatePresence>
  {lang && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-50 left-0 mt-2 w-full min-w-max bg-white rounded-2xl p-2 shadow-lg"
    >
      {langLinks.map((link, i) => (
        <span
          key={i}
          onClick={() => {
            i18n.changeLanguage(link.code);
            setLang(false);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
        >
          <img src={link.img} alt={link.label} className="w-5 h-5" />
          {link.label}
        </span>
      ))}
    </motion.div>
  )}
</AnimatePresence>
  </div>

  <span className="ant-badge sc-ea385771-0 rtQUO css-1goufg3">
    <a className="sc-f203a167-0 eCgaQm left flex items-center" aria-label="" rel="nofollow" href="/">
      <span role="img" className="anticon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M3.71573 4.28289C6.00337 1.9057 9.71236 1.9057 12 4.28289C14.2876 1.9057 17.9966 1.9057 20.2843 4.28289C22.5719 6.66008 22.5719 10.5143 20.2843 12.8914L12 21.5L3.71573 12.8914C1.42809 10.5143 1.42809 6.66008 3.71573 4.28289Z"
            stroke="#535353"
            strokeLinejoin="round"
            fill=""
            className=""
          ></path>
        </svg>
      </span>
    </a>
  </span>
  <div className="sc-a4b791bb-1 deNfIJ">
    <div className="sc-a4b791bb-2 eXpEgZ">
      <span className="ant-badge flex items-center sc-a4b791bb-3 gVLnKi css-1goufg3">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M3.30667 1.67041L20.6933 6.32915"
            stroke="#535353"
            strokeLinejoin="round"
            className=""
          ></path>
          <path
            d="M22 15L19 6L16 15"
            stroke="#535353"
            strokeLinejoin="round"
            className=""
          ></path>
          <path
            d="M8 11L5 2L2 11"
            stroke="#535353"
            strokeLinejoin="round"
            className=""
          ></path>
          <path
            d="M12 19V2"
            stroke="#535353"
            strokeLinejoin="round"
            className=""
          ></path>
          <path
            d="M8 21C8 19.8954 8.89543 19 10 19H14C15.1046 19 16 19.8954 16 21V22H8V21Z"
            stroke="#535353"
            strokeLinejoin="round"
            className=""
          ></path>
          <path
            d="M19 18C20.6569 18 22 16.6569 22 15H16C16 16.6569 17.3431 18 19 18Z"
            stroke="#535353"
            strokeLinejoin="round"
            className=""
          ></path>
          <path
            d="M5 14C6.65685 14 8 12.6569 8 11H2C2 12.6569 3.34315 14 5 14Z"
            stroke="#535353"
            strokeLinejoin="round"
            className=""
          ></path>
        </svg>
      </span>
    </div>
  </div>
 
</div>

<div className="promo-bubble">
      <div className="icon">
        <div className="icon-text">%</div>
      </div>
      <div className="text">
        <p className="">{t("discount")}</p>
      </div>
    </div>
</div>

<MobileMenu t={t} />
</div>
    </div>
  )
}

export default Navbar