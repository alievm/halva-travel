// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// export default instance;

import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: `${baseURL}/api`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
