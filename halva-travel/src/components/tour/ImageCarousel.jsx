import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ImageCarousel = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
      <div className="w-full">
        {/* Main image */}
        <Swiper
          spaceBetween={10}
          navigation
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="rounded-lg"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img.src}
                alt={`slide-${i}`}
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
  
        {/* Thumbnails with labels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative cursor-pointer overflow-hidden rounded-xl ${
                i === activeIndex ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <img
                src={img.src}
                alt={`thumb-${i}`}
                className="h-24 w-full object-cover"
              />
              <div
                className={`absolute bottom-1 left-1 bg-white text-xs font-medium rounded px-1 py-0.5 ${
                  img.overlay ? 'bg-black/60 text-white right-1 left-1 text-center' : ''
                }`}
              >
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ImageCarousel;
