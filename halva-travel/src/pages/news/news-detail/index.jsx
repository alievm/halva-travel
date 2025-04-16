import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../../../api/axiosConfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// 👇 Кастомные стрелки
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 cursor-pointer top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
  >
    <FaChevronLeft strokeWidth={0.7} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 cursor-pointer top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
  >
    <FaChevronRight strokeWidth={0.7} />
  </button>
);

const SkeletonCard = () => (
  <div className="bg-gray-100 rounded-lg animate-pulse h-full">
    <div className="w-full h-44 bg-gray-300 rounded-t-xl"></div>
    <div className="p-4 space-y-2">
      <div className="h-3 w-24 bg-gray-300 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
      <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const NewsDetails = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "ru";

  const [news, setNews] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    setLoadingNews(true);
    setLoadingRecent(true);

    axios
      .get(`/news/slug/${slug}`)
      .then((res) => {
        setNews(res.data);
        setLoadingNews(false);
      })
      .catch(console.error);

    axios
      .get("/news")
      .then((res) => {
        setRecent(res.data.slice(0, 10));
        setLoadingRecent(false);
      })
      .catch(console.error);
  }, [slug]);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {loadingNews ? (
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-3/4 bg-gray-200 rounded mx-auto"></div>
          <div className="h-4 w-24 bg-gray-300 rounded mx-auto"></div>
          <div className="w-full h-[300px] bg-gray-200 rounded-xl mt-4"></div>
          <div className="space-y-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl md:text-4xl text-center font-semibold mb-4">
            {news.title[currentLang]}
          </h1>
          <p className="text-sm text-center text-gray-700 mb-4">
            {new Date(news.createdAt).toLocaleDateString()}
          </p>

          {news.image && (
            <img
              src={`http://localhost:5000/uploads/${news.image}`}
              alt={news.title[currentLang]}
              className="w-full max-h-[500px] object-cover rounded-2xl mb-6"
            />
          )}

          <div className="text-base leading-7 text-gray-800 whitespace-pre-line mb-10">
            {news.content[currentLang]}
          </div>
        </>
      )}

      {/* Карусель последних новостей */}
      <div className="mt-14">
        <h3 className="text-xl font-semibold mb-4">Последние новости</h3>
        {loadingRecent ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <Slider className="relative" {...sliderSettings}>
            {recent.map((item) => (
              <Link key={item._id} to={`/news/${item.slug}`} className="px-2">
                <div className="bg-white rounded-lg transition-all duration-300 h-full ">
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.title[currentLang]}
                    className="w-full h-44 rounded-xl object-cover"
                  />
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <h4 className="text-base leading-5 font-semibold text-gray-800 hover:text-[#A88856] line-clamp-2">
                      {item.title[currentLang]}
                    </h4>
                    <p className="text-xs line-clamp-2 text-gray-500 mt-2">
                      {item.content[currentLang]}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default NewsDetails;
