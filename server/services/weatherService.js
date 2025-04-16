const axios = require('axios');

const getWeatherByRegionName = async (cityName) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY; // например, OpenWeatherMap
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=cc7be06f20a7617981f32ff5cf3df1e4`);
    
    const { temp } = response.data.main;
    const condition = response.data.weather[0].main;
    const icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;

    return { temp, condition, icon };
  } catch (error) {
    console.error('Weather fetch error:', error.message);
    return null;
  }
};

module.exports = { getWeatherByRegionName };
