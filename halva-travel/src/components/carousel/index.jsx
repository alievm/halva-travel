import React from 'react'
import { MapPin, Star } from 'lucide-react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const TravelCarousel = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto py-6 px-4">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        showIndicators={true}
        showArrows={true}
        autoPlay={false}
        interval={5000}
      >
       <div className="relative rounded-xl overflow-hidden">
  <img
    src="/image 10010.png" // Замените на фактический путь к изображению
    alt="Khorezm Climate Resort"
    className="w-full h-[400px] object-cover"
  />

  <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 md:w-[550px] md:h-[90%] rounded-xl m-4 p-6 flex flex-col justify-between shadow-lg">
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin size={16} /> Узбекистан / Хорезм
      </div>
      <div className="flex items-center gap-1 my-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={20} fill="#FACC15" stroke="#FACC15" />
        ))}
      </div>
      <h2 className="text-2xl text-left font-bold text-gray-800 leading-snug">
        Хорезм Климaтический Курорт
      </h2>
      <p className="text-gray-600 text-left mt-2">
        Отдохните и восстановите силы в живописном сердце Хорезма, где сочетаются древность и комфорт.
      </p>
    </div>

    <button className="bg-[#DFAF68] cursor-pointer text-white px-6 py-3 rounded-xl text-sm hover:bg-[#b08c52] transition">
      Подробнее
    </button>
  </div>

  <div className="absolute top-2 right-4 text-xs text-gray-600">
    Реклама. ООО «Центрбронь» erid: 2W5zFJkKT6Q
  </div>
</div>

      </Carousel>
    </div>
  )
}

export default TravelCarousel
