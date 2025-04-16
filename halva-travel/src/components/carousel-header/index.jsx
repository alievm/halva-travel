import React, {useState} from 'react'
import { Carousel } from "react-responsive-carousel";
import { motion, AnimatePresence } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";



const CarouselHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [

    {
      image: "/uzbekistan-kirov.jpeg", 
      title: "Тур по Узбекистану",
      subtitle: "Элитные отели в Узбекистане с индивидуальным обслуживанием и исключительной атмосферой",
      label: "\u0412\u044b\u0433\u043e\u0434\u0430 \u0434\u043e 50%",
      cta: "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0443\u0440"
    },
    {
      image: "/9293e4b8-8513-11ed-9669-b6ef0bd612d0.1200x1000.jpeg",
      title: "Тур по Узбекистану",
      subtitle: "Элитные отели в Узбекистане с индивидуальным обслуживанием и исключительной атмосферой",
      label: "\u0412\u044b\u0433\u043e\u0434\u0430 \u0434\u043e 50%",
      cta: "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0443\u0440"
    },

    {
      image: "/bg.jpg", 
      title: "Тур по Узбекистану",
      subtitle: "Элитные отели в Узбекистане с индивидуальным обслуживанием и исключительной атмосферой",
      label: "\u0412\u044b\u0433\u043e\u0434\u0430 \u0434\u043e 50%",
      cta: "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0443\u0440"
    },
   
   
  ];

  return (
       <div className="max-w-screen-2xl mx-auto py-10">
      <Carousel
        className="rounded-4xl overflow-hidden"
        autoPlay
        infiniteLoop
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        interval={5000}
        selectedItem={currentSlide}
        onChange={(index) => setCurrentSlide(index)}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[600px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <AnimatePresence mode="wait">
              {currentSlide === index && (
                <motion.div
                  key={index}
                  className="absolute inset-0 bg-black/20 bg-opacity-40 flex flex-col justify-center items-start px-10 text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.span
                    className="bg-[#A88856]/50 text-sm px-3 py-1 rounded-full w-fit mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Реклама
                  </motion.span>
                  <motion.h2
                    className="text-4xl font-bold mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    className="text-lg mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.p
                    className="text-6xl will-change-transform font-extrabold text-white mb-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    {slide.label}
                  </motion.p>
                  <motion.button
                    className="bg-[#DFAF68] cursor-pointer text-white px-6 py-3 rounded-xl text-sm hover:bg-[#b08c52] transition"
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {slide.cta}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselHeader